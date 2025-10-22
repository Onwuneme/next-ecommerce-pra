import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DBconnect } from './db';
import UserModel from './models/UserModel';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await DBconnect();
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) throw new Error('Invalid password');
        return user;
      },
    }),
  ],

  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },

  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      }

      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

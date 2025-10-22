import { DBconnect } from '@/lib/db';
import UserModel from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await DBconnect();
  const hanshedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({
    name,
    email,
    password: hanshedPassword,
  });
  try {
    await newUser.save();
    return Response.json(
      {
        message: 'User has been created',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if( error instanceof Error ){
        console.log(Response.json(
          { message: error.message },
          {
            status: 500,
          }
        ))

        return Response.json(
          { message: error.message },
          {
            status: 500,
          }
        );
    }
  }
};

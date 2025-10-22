'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

export default function Form() {
  const { data: session } = useSession();
  const params = useSearchParams();
  const callbackUrl = params?.get('callbackUrl') ?? '/';
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (session && session.user) {
      // Use replace to avoid creating an extra history entry
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        const url = new URL(window.location.href);
        url.searchParams.set('error', res.error);
        url.searchParams.delete('success');
        // Use replace so back button behavior is sensible
        router.replace(url.toString());
      } else {
        router.replace(callbackUrl);
      }
    } catch (err) {
      const url = new URL(window.location.href);
      url.searchParams.set('error', 'UnexpectedError');
      url.searchParams.delete('success');
      router.replace(url.toString());
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {/* Display success or error messages */}
        {params.get('error') && (
          <div className="mb-4 text-red-500 text-center">
            {params.get('error') === 'CredentialsSignin'
              ? 'Invalid email or password'
              : params.get('error')}
          </div>
        )}
        {params.get('success') && (
          <div className="mb-4 text-green-600 text-center">
            {params.get('success')}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  // Basic RFC-like validation (not exhaustive) — acceptable for client-side check
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email is invalid',
                },
              })}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
              })}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors?.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 flex justify-center gap-2 rounded-md text-white font-medium transition ${
              isSubmitting
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting && (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            Sign In
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link href={`/register?callbackUrl=${callbackUrl}`} className="text-blue-600 hover:text-blue-700 font-medium underline">Register</Link>
        </div>
      </div>
    </div>
  );
}

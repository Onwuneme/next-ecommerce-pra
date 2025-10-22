/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ClientProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
    </SessionProvider>
  );
}

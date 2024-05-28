import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { redirect } from 'next/navigation';
import { env } from '@/lib/env.mjs';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      // @ts-ignore
      session.user.role = user.role;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  console.log(session);
  if (!session) redirect('/api/auth/signin');
  if (session?.user.role !== 'ADMIN') {
    throw new Error('You need to be an admin');
  }
};

export const signOut = async (router: AppRouterInstance) => {
  const response = await fetch('/api/sign-out', {
    method: 'POST',
    redirect: 'manual',
  });

  if (response.status === 0) {
    // redirected
    // when using `redirect: "manual"`, response status 0 is returned
    return router.refresh();
  }
};

export const getIsLoggedIn = async () => {
  const { session } = await getUserAuth();
  return !!session;
};

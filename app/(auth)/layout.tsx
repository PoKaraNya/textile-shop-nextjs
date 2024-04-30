import { getUserAuth } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default async function AuthLayout({ children }: Props) {
  const session = await getUserAuth();
  if (session?.session) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="bg-muted h-screen pt-8">
      {children}
    </div>
  );
}

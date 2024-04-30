'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/utils';

export default function SignOutBtn() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => signOut(router)} className="w-full text-left">
      Sign out
    </button>
  );
}

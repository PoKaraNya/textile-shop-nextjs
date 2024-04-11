'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { SyntheticEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AccountCard, AccountCardBody, AccountCardFooter } from './AccountCard';

export default function UpdateNameCard({ name }: { name: string }) {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { name } = Object.fromEntries(form.entries()) as { name: string };
    if (name.length < 3) {
      toast.error('Name must be longer than 3 characters.');
      return;
    }

    startTransition(async () => {
      const res = await fetch('/api/account', {
        method: 'PUT',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200) toast.success('Successfully updated name!');
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: 'Your Name',
        description:
          'Please enter your full name, or a display name you are comfortable with.',
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <Input defaultValue={name ?? ''} name="name" disabled />
        </AccountCardBody>
        <AccountCardFooter description="64 characters maximum">
          <Button disabled>Update Name</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}

'use server';

import { ProfileBlock } from '@/components/profile/ProfileBlock';
import { getCurrentUser } from '@/lib/api/users/queries';

export default async function ProfilePage() {
  const { user } = await getCurrentUser();
  return (
    <ProfileBlock user={user!} />
  );
}

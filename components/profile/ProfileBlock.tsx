'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UpdateUserParams, updateUserSchema, User } from '@/lib/db/schema/users';
import { format, parse } from 'date-fns';
import { useValidatedForm } from '@/lib/hooks/useValidatedForm';
import { useTransition } from 'react';
import { updateUserAction } from '@/lib/actions/users';

interface Props {
  user: User
}

const DATE_FORMAT = 'yyyy-MM-dd';

export function ProfileBlock({ user }: Props) {
  const [pending, startMutation] = useTransition();

  const handleSubmit = (data: FormData) => {
    const name = data.get('name') as string;
    const dateOfBirth = parse(data.get('dateOfBirth') as string, DATE_FORMAT, new Date());

    startMutation(async () => {
      await updateUserAction({
        id: user.id, name, dateOfBirth, role: user.role,
      });
    });
  };

  const { handleChange } = useValidatedForm<UpdateUserParams>(updateUserSchema);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <img src={user?.image!} alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          {/* <p className="text-sm text-gray-500 dark:text-gray-400">Verified on June 15, 2023</p> */}
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                Bonuses
              </h3>
              <p className="text-4xl font-bold">
                $
                {user?.bonuses ?? 0}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Date of Birth</h3>
              <p>
                {user?.dateOfBirth && format(user?.dateOfBirth, 'MM / dd / yyyy')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Successful Purchases</h3>
              <p className="text-4xl font-bold">
                {user?.successPurchases ?? 0}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Unsuccessful Purchases</h3>
              <p className="text-4xl font-bold">
                {user?.failPurchases ?? 0}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <form action={handleSubmit} onChange={handleChange}>
              <Label htmlFor="name">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                defaultValue={user?.name ?? ''}
              />
              <Label htmlFor="dateOfBirth">
                Date of Birth
              </Label>
              <Input
                name="dateOfBirth"
                id="dateOfBirth"
                type="date"
                defaultValue={format(user?.dateOfBirth ?? new Date(), DATE_FORMAT)}
                className="w-full"
              />
              <Button
                className="mt-4"
                type="submit"
              >
                {pending ? 'Loading...' : 'Save Changes'}
              </Button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

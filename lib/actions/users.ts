'use server';

import { revalidatePath } from 'next/cache';
import { updateUserParams, UpdateUserParams } from '@/lib/db/schema/users';
import { updateUser } from '@/lib/api/users/mutations';

const handleErrors = (e: unknown) => {
  const errMsg = 'Error, please try again.';
  if (e instanceof Error) {
    return e.message.length > 0 ? e.message : errMsg;
  }
  if (e && typeof e === 'object' && 'error' in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUsers = () => revalidatePath('/users');

export const updateUserAction = async (input: UpdateUserParams) => {
  try {
    const payload = updateUserParams.parse(input);
    await updateUser(payload.id, payload);
    revalidateUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

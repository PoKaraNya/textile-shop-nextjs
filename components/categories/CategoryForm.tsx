'use client';

import { z } from 'zod';

import { useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useValidatedForm } from '@/lib/hooks/useValidatedForm';

import { type Action, cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBackPath } from '@/components/shared/BackButton';

import { type Category, insertCategoryParams } from '@/lib/db/schema/categories';
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from '@/lib/actions/categories';
import { TAddOptimistic } from '@/app/admin/categories/useOptimisticCategories';
import * as Sentry from '@sentry/nextjs';

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? 'ing...' : 'e'}`
        : `Creat${isCreating ? 'ing...' : 'e'}`}
    </Button>
  );
};

export function CategoryForm({
  category,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  category?: Category | null;
  openModal?: (category?: Category) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) {
  const {
    errors, hasErrors, setErrors, handleChange,
  } = useValidatedForm<Category>(insertCategoryParams);
  const editing = !!category?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath('categories');

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Category },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? 'Error',
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Category ${action}d!`);
      if (action === 'delete') router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const categoryParsed = await insertCategoryParams.safeParseAsync({ ...payload });
    if (!categoryParsed.success) {
      setErrors(categoryParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = categoryParsed.data;
    const pendingCategory: Category = {
      updatedAt: category?.updatedAt ?? new Date(),
      createdAt: category?.createdAt ?? new Date(),
      id: category?.id ?? '',
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingCategory,
          action: editing ? 'update' : 'create',
        });

        const error = editing
          ? await updateCategoryAction({ ...values, id: category.id })
          : await createCategoryAction(values);

        const errorFormatted = {
          error: error ?? 'Error',
          values: pendingCategory,
        };
        onSuccess(
          editing ? 'update' : 'create',
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      Sentry.captureException(e);
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className="space-y-8">
      {/* Schema fields start */}
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.title ? 'text-destructive' : '',
          )}
        >
          Title
        </Label>
        <Input
          type="text"
          name="title"
          className={cn(errors?.title ? 'ring ring-destructive' : '')}
          defaultValue={category?.title ?? ''}
        />
        {errors?.title ? (
          <p className="text-xs text-destructive mt-2">{errors.title[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.description ? 'text-destructive' : '',
          )}
        >
          Description
        </Label>
        <Input
          type="text"
          name="description"
          className={cn(errors?.description ? 'ring ring-destructive' : '')}
          defaultValue={category?.description ?? ''}
        />
        {errors?.description ? (
          <p className="text-xs text-destructive mt-2">{errors.description[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.photo ? 'text-destructive' : '',
          )}
        >
          Photo
        </Label>
        <Input
          type="text"
          name="photo"
          className={cn(errors?.photo ? 'ring ring-destructive' : '')}
          defaultValue={category?.photo ?? ''}
        />
        {errors?.photo ? (
          <p className="text-xs text-destructive mt-2">{errors.photo[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant="destructive"
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: 'delete', data: category });
              const error = await deleteCategoryAction(category.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? 'Error',
                values: category,
              };

              onSuccess('delete', error ? errorFormatted : undefined);
            });
          }}
        >
          Delet
          {isDeleting ? 'ing...' : 'e'}
        </Button>
      ) : null}
    </form>
  );
}

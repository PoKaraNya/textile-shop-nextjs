'use client';

import { z } from 'zod';

import { useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useValidatedForm } from '@/lib/hooks/useValidatedForm';

import { type Action, cn } from '@/lib/utils';
import { type TAddOptimistic } from '@/app/admin/products/useOptimisticProducts';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBackPath } from '@/components/shared/BackButton';

import { insertProductParams, type Product } from '@/lib/db/schema/products';
import { createProductAction, deleteProductAction, updateProductAction } from '@/lib/actions/products';
import * as Sentry from '@sentry/nextjs';

function SaveButton({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) {
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
}

export function ProductForm({

  product,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  product?: Product | null;

  openModal?: (product?: Product) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) {
  const {
    errors, hasErrors, setErrors, handleChange,
  } = useValidatedForm<Product>(insertProductParams);
  const editing = !!product?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath('products');

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Product },
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
      toast.success(`Product ${action}d!`);
      if (action === 'delete') router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const productParsed = await insertProductParams.safeParseAsync({ ...payload });
    if (!productParsed.success) {
      setErrors(productParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = productParsed.data;
    const pendingProduct: Product = {
      updatedAt: product?.updatedAt ?? new Date(),
      createdAt: product?.createdAt ?? new Date(),
      id: product?.id ?? '',
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingProduct,
          action: editing ? 'update' : 'create',
        });

        const error = editing
          ? await updateProductAction({ ...values, id: product.id })
          : await createProductAction(values);

        const errorFormatted = {
          error: error ?? 'Error',
          values: pendingProduct,
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
          defaultValue={product?.title ?? ''}
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
          defaultValue={product?.description ?? ''}
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
          defaultValue={product?.photo ?? ''}
        />
        {errors?.photo ? (
          <p className="text-xs text-destructive mt-2">{errors.photo[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.price ? 'text-destructive' : '',
          )}
        >
          Price
        </Label>
        <Input
          type="text"
          name="price"
          className={cn(errors?.price ? 'ring ring-destructive' : '')}
          defaultValue={product?.price ?? ''}
        />
        {errors?.price ? (
          <p className="text-xs text-destructive mt-2">{errors.price[0]}</p>
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
              addOptimistic && addOptimistic({ action: 'delete', data: product });
              const error = await deleteProductAction(product.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? 'Error',
                values: product,
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

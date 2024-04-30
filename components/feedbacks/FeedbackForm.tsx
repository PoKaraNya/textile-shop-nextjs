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

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

import { type Feedback, insertFeedbackParams } from '@/lib/db/schema/feedbacks';
import { createFeedbackAction, deleteFeedbackAction, updateFeedbackAction } from '@/lib/actions/feedbacks';
import { type Product, type ProductId } from '@/lib/db/schema/products';
import { TAddOptimistic } from '@/app/admin/feedbacks/useOptimisticFeedbacks';
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

export function FeedbackForm({
  products,
  productId,
  feedback,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  feedback?: Feedback | null;
  products: Product[];
  productId?: ProductId
  openModal?: (feedback?: Feedback) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) {
  const {
    errors, hasErrors, setErrors, handleChange,
  } = useValidatedForm<Feedback>(insertFeedbackParams);
  const editing = !!feedback?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath('feedbacks');

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Feedback },
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
      toast.success(`Feedback ${action}d!`);
      if (action === 'delete') router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const feedbackParsed = await insertFeedbackParams.safeParseAsync({ productId, ...payload });
    if (!feedbackParsed.success) {
      setErrors(feedbackParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = feedbackParsed.data;
    const pendingFeedback: Feedback = {
      updatedAt: feedback?.updatedAt ?? new Date(),
      createdAt: feedback?.createdAt ?? new Date(),
      id: feedback?.id ?? '',
      userId: feedback?.userId ?? '',
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingFeedback,
          action: editing ? 'update' : 'create',
        });

        const error = editing
          ? await updateFeedbackAction({ ...values, id: feedback.id })
          : await createFeedbackAction(values);

        const errorFormatted = {
          error: error ?? 'Error',
          values: pendingFeedback,
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
            errors?.text ? 'text-destructive' : '',
          )}
        >
          Text
        </Label>
        <Input
          type="text"
          name="text"
          className={cn(errors?.text ? 'ring ring-destructive' : '')}
          defaultValue={feedback?.text ?? ''}
        />
        {errors?.text ? (
          <p className="text-xs text-destructive mt-2">{errors.text[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.rating ? 'text-destructive' : '',
          )}
        >
          Rating
        </Label>
        <Input
          type="text"
          name="rating"
          className={cn(errors?.rating ? 'ring ring-destructive' : '')}
          defaultValue={feedback?.rating ?? ''}
        />
        {errors?.rating ? (
          <p className="text-xs text-destructive mt-2">{errors.rating[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {productId ? null : (
        <div>
          <Label
            className={cn(
              'mb-2 inline-block',
              errors?.productId ? 'text-destructive' : '',
            )}
          >
            Product
          </Label>
          <Select defaultValue={feedback?.productId} name="productId">
            <SelectTrigger
              className={cn(errors?.productId ? 'ring ring-destructive' : '')}
            >
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products?.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.id}
                  {/* TODO: Replace with a field from the product model */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.productId ? (
            <p className="text-xs text-destructive mt-2">{errors.productId[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
      ) }
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
              addOptimistic && addOptimistic({ action: 'delete', data: feedback });
              const error = await deleteFeedbackAction(feedback.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? 'Error',
                values: feedback,
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

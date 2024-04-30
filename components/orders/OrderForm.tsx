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

import { insertOrderParams, type Order } from '@/lib/db/schema/orders';
import { createOrderAction, deleteOrderAction, updateOrderAction } from '@/lib/actions/orders';
import { TAddOptimistic } from '@/app/admin/orders/useOptimisticOrders';

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

export function OrderForm({
  order,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  order?: Order | null;
  openModal?: (order?: Order) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) {
  const {
    errors, hasErrors, setErrors, handleChange,
  } = useValidatedForm<Order>(insertOrderParams);
  const editing = !!order?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath('orders');

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Order },
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
      toast.success(`Order ${action}d!`);
      if (action === 'delete') router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const orderParsed = await insertOrderParams.safeParseAsync({ ...payload });
    if (!orderParsed.success) {
      setErrors(orderParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = orderParsed.data;
    const pendingOrder: Order = {
      updatedAt: order?.updatedAt ?? new Date(),
      createdAt: order?.createdAt ?? new Date(),
      id: order?.id ?? '',
      userId: order?.userId ?? '',
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingOrder,
          action: editing ? 'update' : 'create',
        });

        const error = editing
          ? await updateOrderAction({ ...values, id: order.id })
          : await createOrderAction(values);

        const errorFormatted = {
          error: error ?? 'Error',
          values: pendingOrder,
        };
        onSuccess(
          editing ? 'update' : 'create',
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
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
            errors?.number ? 'text-destructive' : '',
          )}
        >
          Number
        </Label>
        <Input
          type="text"
          name="number"
          className={cn(errors?.number ? 'ring ring-destructive' : '')}
          defaultValue={order?.number ?? ''}
        />
        {errors?.number ? (
          <p className="text-xs text-destructive mt-2">{errors.number[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.id ? 'text-destructive' : '',
          )}
        >
          Id
        </Label>
        <Input
          type="text"
          name="id"
          className={cn(errors?.id ? 'ring ring-destructive' : '')}
          defaultValue={order?.id ?? ''}
        />
        {errors?.id ? (
          <p className="text-xs text-destructive mt-2">{errors.id[0]}</p>
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
          defaultValue={order?.price ?? ''}
        />
        {errors?.price ? (
          <p className="text-xs text-destructive mt-2">{errors.price[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.notes ? 'text-destructive' : '',
          )}
        >
          Notes
        </Label>
        <Input
          type="text"
          name="notes"
          className={cn(errors?.notes ? 'ring ring-destructive' : '')}
          defaultValue={order?.notes ?? ''}
        />
        {errors?.notes ? (
          <p className="text-xs text-destructive mt-2">{errors.notes[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

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
              addOptimistic && addOptimistic({ action: 'delete', data: order });
              const error = await deleteOrderAction(order.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? 'Error',
                values: order,
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

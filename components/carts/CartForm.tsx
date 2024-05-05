import { z } from 'zod';
import { useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useValidatedForm } from '@/lib/hooks/useValidatedForm';

import { type Action, cn } from '@/lib/utils';
import { type TAddOptimistic } from '@/app/admin/carts/useOptimisticCarts';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBackPath } from '@/components/shared/BackButton';

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

import { type Cart, insertCartParams } from '@/lib/db/schema/carts';
import { createCartAction, deleteCartAction, updateCartAction } from '@/lib/actions/carts';
import { type Product, type ProductId } from '@/lib/db/schema/products';

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

const CartForm = ({
  products,
  productId,
  cart,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  cart?: Cart | null;
  products: Product[];
  productId?: ProductId
  openModal?: (cart?: Cart) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const {
    errors, hasErrors, setErrors, handleChange,
  } = useValidatedForm<Cart>(insertCartParams);
  const editing = !!cart?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath('carts');

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Cart },
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
      toast.success(`Cart ${action}d!`);
      if (action === 'delete') router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const cartParsed = await insertCartParams.safeParseAsync({ productId, ...payload });
    if (!cartParsed.success) {
      setErrors(cartParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = cartParsed.data;
    const pendingCart: Cart = {

      id: cart?.id ?? '',
      userId: cart?.userId ?? '',
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingCart,
          action: editing ? 'update' : 'create',
        });

        const error = editing
          ? await updateCartAction({ ...values, id: cart.id })
          : await createCartAction(values);

        const errorFormatted = {
          error: error ?? 'Error',
          values: pendingCart,
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
          <Select defaultValue={cart?.productId} name="productId">
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
      <div>
        <Label
          className={cn(
            'mb-2 inline-block',
            errors?.count ? 'text-destructive' : '',
          )}
        >
          Count
        </Label>
        <Input
          type="text"
          name="count"
          className={cn(errors?.count ? 'ring ring-destructive' : '')}
          defaultValue={cart?.count ?? ''}
        />
        {errors?.count ? (
          <p className="text-xs text-destructive mt-2">{errors.count[0]}</p>
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
              addOptimistic && addOptimistic({ action: 'delete', data: cart });
              const error = await deleteCartAction(cart.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? 'Error',
                values: cart,
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
};

export default CartForm;

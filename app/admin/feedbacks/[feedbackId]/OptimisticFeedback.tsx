'use client';

import { useOptimistic, useState } from 'react';
import { TAddOptimistic } from '@/app/admin/feedbacks/useOptimisticFeedbacks';
import { type Feedback } from '@/lib/db/schema/feedbacks';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/shared/Modal';
import { FeedbackForm } from '@/components/feedbacks';
import { type Product, type ProductId } from '@/lib/db/schema/products';

export default function OptimisticFeedback({
  feedback,
  products,
  productId,
}: {
  feedback: Feedback;
  products: Product[];
  productId?: ProductId
}) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticFeedback, setOptimisticFeedback] = useOptimistic(feedback);
  const updateFeedback: TAddOptimistic = (input) => setOptimisticFeedback({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <FeedbackForm
          feedback={optimisticFeedback}
          products={products}
          productId={productId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateFeedback}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticFeedback.text}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          'bg-secondary p-4 rounded-lg break-all text-wrap',
          optimisticFeedback.id === 'optimistic' ? 'animate-pulse' : '',
        )}
      >
        {JSON.stringify(optimisticFeedback, null, 2)}
      </pre>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { CompleteFeedback, type Feedback } from '@/lib/db/schema/feedbacks';
import { Modal } from '@/components/shared/Modal';
import { type Product, type ProductId } from '@/lib/db/schema/products';
import { useOptimisticFeedbacks } from '@/app/admin/feedbacks/useOptimisticFeedbacks';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';

type TOpenModal = (feedback?: Feedback) => void;

function FeedbackElement({
  feedback,
}: {
  feedback: CompleteFeedback;
}) {
  const optimistic = feedback.id === 'optimistic';
  const deleting = feedback.id === 'delete';
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes('feedbacks')
    ? pathname
    : `${pathname}/feedbacks/`;

  return (
    <li
      className={cn(
        'flex justify-between my-2',
        mutating ? 'opacity-30 animate-pulse' : '',
        deleting ? 'text-destructive' : '',
      )}
    >
      <div className="w-full">
        <div>{feedback.text}</div>
      </div>
      <Button variant="link" asChild>
        <Link href={`${basePath}/${feedback.id}`}>
          Edit
        </Link>
      </Button>
    </li>
  );
}

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => (
  <div className="text-center">
    <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
      No feedbacks
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Get started by creating a new feedback.
    </p>
    <div className="mt-6">
      <Button onClick={() => openModal()}>
        <PlusIcon className="h-4" />
        {' '}
        New Feedbacks
        {' '}
      </Button>
    </div>
  </div>
);

export function FeedbackList({
  feedbacks,
  products,
  productId,
}: {
  feedbacks: CompleteFeedback[];
  products: Product[];
  productId?: ProductId
}) {
  const { optimisticFeedbacks, addOptimisticFeedback } = useOptimisticFeedbacks(
    feedbacks,
    products,
  );
  const [open, setOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);
  const openModal = (feedback?: Feedback) => {
    setOpen(true);
    feedback ? setActiveFeedback(feedback) : setActiveFeedback(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeFeedback ? 'Edit Feedback' : 'Create Feedback'}
      >
        <FeedbackForm
          feedback={activeFeedback}
          addOptimistic={addOptimisticFeedback}
          openModal={openModal}
          closeModal={closeModal}
          products={products}
          productId={productId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant="outline">
          +
        </Button>
      </div>
      {optimisticFeedbacks.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticFeedbacks.map((feedback) => (
            <FeedbackElement
              feedback={feedback}
              key={feedback.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

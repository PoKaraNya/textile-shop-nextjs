'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { type Category, CompleteCategory } from '@/lib/db/schema/categories';
import { Modal } from '@/components/shared/Modal';

import { useOptimisticCategories } from '@/app/admin/categories/useOptimisticCategories';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CategoryForm } from './CategoryForm';

type TOpenModal = (category?: Category) => void;

const CategoryElement = ({
  category,
}: {
  category: CompleteCategory;
}) => {
  const optimistic = category.id === 'optimistic';
  const deleting = category.id === 'delete';
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes('categories')
    ? pathname
    : `${pathname}/categories/`;

  return (
    <li
      className={cn(
        'flex justify-between my-2',
        mutating ? 'opacity-30 animate-pulse' : '',
        deleting ? 'text-destructive' : '',
      )}
    >
      <div className="w-full">
        <div>{category.title}</div>
      </div>
      <Button variant="link" asChild>
        <Link href={`${basePath}/${category.id}`}>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => (
  <div className="text-center">
    <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
      No categories
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Get started by creating a new category.
    </p>
    <div className="mt-6">
      <Button onClick={() => openModal()}>
        <PlusIcon className="h-4" />
        {' '}
        New Categories
        {' '}
      </Button>
    </div>
  </div>
);
export function CategoryList({
  categories,
}: {
  categories: CompleteCategory[];
}) {
  const { optimisticCategories, addOptimisticCategory } = useOptimisticCategories(
    categories,
  );
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const openModal = (category?: Category) => {
    setOpen(true);
    category ? setActiveCategory(category) : setActiveCategory(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeCategory ? 'Edit Category' : 'Create Category'}
      >
        <CategoryForm
          category={activeCategory}
          addOptimistic={addOptimisticCategory}
          openModal={openModal}
          closeModal={closeModal}

        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant="outline">
          +
        </Button>
      </div>
      {optimisticCategories.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticCategories.map((category) => (
            <CategoryElement
              category={category}
              key={category.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

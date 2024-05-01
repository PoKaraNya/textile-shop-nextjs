"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Cart, CompleteCart } from "@/lib/db/schema/carts";
import Modal from "@/components/shared/Modal";
import { type Product, type ProductId } from "@/lib/db/schema/products";
import { useOptimisticCarts } from "@/app/(app)/carts/useOptimisticCarts";
import { Button } from "@/components/ui/button";
import CartForm from "./CartForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (cart?: Cart) => void;

export default function CartList({
  carts,
  products,
  productId 
}: {
  carts: CompleteCart[];
  products: Product[];
  productId?: ProductId 
}) {
  const { optimisticCarts, addOptimisticCart } = useOptimisticCarts(
    carts,
    products 
  );
  const [open, setOpen] = useState(false);
  const [activeCart, setActiveCart] = useState<Cart | null>(null);
  const openModal = (cart?: Cart) => {
    setOpen(true);
    cart ? setActiveCart(cart) : setActiveCart(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeCart ? "Edit Cart" : "Create Cart"}
      >
        <CartForm
          cart={activeCart}
          addOptimistic={addOptimisticCart}
          openModal={openModal}
          closeModal={closeModal}
          products={products}
        productId={productId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticCarts.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticCarts.map((cart) => (
            <Cart
              cart={cart}
              key={cart.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Cart = ({
  cart,
  openModal,
}: {
  cart: CompleteCart;
  openModal: TOpenModal;
}) => {
  const optimistic = cart.id === "optimistic";
  const deleting = cart.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("carts")
    ? pathname
    : pathname + "/carts/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{cart.productId}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + cart.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No carts
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new cart.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Carts </Button>
      </div>
    </div>
  );
};

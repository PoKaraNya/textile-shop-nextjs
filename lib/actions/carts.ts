"use server";

import { revalidatePath } from "next/cache";
import {
  createCart,
  deleteCart,
  updateCart,
} from "@/lib/api/carts/mutations";
import {
  CartId,
  NewCartParams,
  UpdateCartParams,
  cartIdSchema,
  insertCartParams,
  updateCartParams,
} from "@/lib/db/schema/carts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCarts = () => revalidatePath("/carts");

export const createCartAction = async (input: NewCartParams) => {
  try {
    const payload = insertCartParams.parse(input);
    await createCart(payload);
    revalidateCarts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCartAction = async (input: UpdateCartParams) => {
  try {
    const payload = updateCartParams.parse(input);
    await updateCart(payload.id, payload);
    revalidateCarts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCartAction = async (input: CartId) => {
  try {
    const payload = cartIdSchema.parse({ id: input });
    await deleteCart(payload.id);
    revalidateCarts();
  } catch (e) {
    return handleErrors(e);
  }
};
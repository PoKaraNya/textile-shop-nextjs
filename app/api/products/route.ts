import {
  createProduct, deleteProduct, getAllProducts, updateProduct,
} from '@/lib/api/products';
import { NextRequest } from 'next/server';

export async function GET(request: Request) {
  const products = await getAllProducts();
  return Response.json(products);
}

export async function POST(request: Request) {
  const product = await createProduct(await request.json());
  return Response.json(product);
}

export async function PATCH(request: Request) {
  const product = await updateProduct(await request.json());
  return Response.json(product);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return Response.error();
  const product = await deleteProduct(id);
  return Response.json(product);
}

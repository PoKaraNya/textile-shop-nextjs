import { Product } from '@prisma/client';
import { ProductHomeCard } from '@/components/products/ProductHomeCard';

interface Props {
  products: Product[]
}

export function ProductHomeGrid({ products }: Props) {
  return (
    <>
      {products.map((product: Product) => (
        <ProductHomeCard
          product={product}
          key={product.id}
        />
      ))}
    </>
  );
}

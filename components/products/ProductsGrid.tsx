import { Product } from '@prisma/client';
import { ProductCard } from '@/components/products';
import { ProductId } from '@/lib/db/schema/products';

interface Props {
  products: Product[]
  productsInCart: ProductId[],
  productsInFavorite: ProductId[],
}

export function ProductsGrid({ products, productsInCart, productsInFavorite }: Props) {
  return (
    <div className="flex flex-wrap gap-5 justify-around pt-3 pb-3">
      {products.map((product: Product) => (
        <ProductCard
          inCart={productsInCart.includes(product.id)}
          inFavorite={productsInFavorite.includes(product.id)}
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
}

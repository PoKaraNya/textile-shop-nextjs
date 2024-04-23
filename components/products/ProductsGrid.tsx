import { Product } from '@prisma/client';
import ProductCard from '@/components/products/ProductCard';

interface Props {
  products: Product[]
}

function ProductsGrid({ products }: Props) {
  return (
    <div className="flex flex-wrap gap-5 justify-around">
      {products.map((product: Product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductsGrid;
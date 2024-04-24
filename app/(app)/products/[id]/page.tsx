import { getProductById } from '@/lib/api/products/queries';
import { Suspense } from 'react';
import Loading from '@/app/loading';

interface Props {
  params: {
    id: string
  }
}

async function ProductIdPage({ params }: Props) {
  const { product } = await getProductById(params.id);

  return (
    <div>
      {params.id}
      <Suspense fallback={<Loading />}>
        {JSON.stringify(product, null, 2)}
      </Suspense>
    </div>
  );
}

export default ProductIdPage;

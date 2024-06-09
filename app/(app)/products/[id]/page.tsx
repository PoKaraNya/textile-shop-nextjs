import { getProductById } from '@/lib/api/products/queries';
import { Suspense } from 'react';
import Loading from '@/app/(app)/loading';
import { Separator } from '@/components/ui/separator';
import { CartFavoriteBlock } from '@/components/products/CartFavoriteBlock';
import { isProductInCart } from '@/lib/api/carts/queries';
import { isProductInFavorite } from '@/lib/api/favorites/queries';

interface Props {
  params: {
    id: string
  }
}

export default async function ProductIdPage({ params }: Props) {
  const { product } = await getProductById(params.id);

  const images = [
    product?.photo,
    product?.photo,
    product?.photo,
    product?.photo,
    product?.photo,
  ];

  const inCart = await isProductInCart(product?.id!);
  const inFavorite = await isProductInFavorite(product?.id!);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12">
        <div className="grid gap-4 items-start">
          <h1 className="font-bold text-2xl sm:text-3xl">
            Acme Prism T-Shirt: The Modern Blend of Style and Comfort
          </h1>
          <div className="flex md items-start">
            {/* <Rating value={rating} /> */}
            <div className="text-4xl font-bold ml-auto">
              {product?.price}
              {' грн'}
            </div>
          </div>
          <form className="bg grid gap-4 md:gap-10">
            <CartFavoriteBlock productId={product?.id!} inCart={inCart} inFavorite={inFavorite} />
          </form>
          <Separator className="border-gray-200 dark:border-gray-800" />
          <div className="grid gap-4 text-sm leading-loose">
            <p>{product?.description}</p>
          </div>
        </div>
        <div className="grid gap-3 items-start">
          <div className="hidden md:flex gap-4 items-start">
            {images.map((image) => (
              <button
                type="button"
                className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
              >
                <img
                  alt="Preview thumbnail"
                  className="aspect-square object-cover"
                  height={100}
                  src={image!}
                  width={100}
                />
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:gap-10">
            <img
              alt="Product Image"
              className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              height={600}
              src={product?.photo!}
              width={600}
            />
            <div className="flex md:hidden items-start">
              {images.map((image) => (
                <button
                  type="button"
                  // className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"

                >
                  <img
                    alt="Preview thumbnail"
                    className="aspect-square object-cover bg-red"
                    height={100}
                    src={image!}
                    width={100}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

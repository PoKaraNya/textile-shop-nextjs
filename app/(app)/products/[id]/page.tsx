import { getProductById } from '@/lib/api/products/queries';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { range } from 'lodash';
import Rating from '@/components/shared/Rating';
import RadioButtons from '@/components/shared/RadioButtons';

interface Props {
  params: {
    id: string
  }
}

const sizes = [
  {
    name: 'xs',
    title: 'XS',
  }, {
    name: 's',
    title: 'S',
  },
  {
    name: 'm',
    title: 'M',
  },
  {
    name: 'l',
    title: 'L',
  },
  {
    name: 'xl',
    title: 'XL',
  },
];

const colors = [
  {
    name: 'black',
    title: 'Black',
  },
  {
    name: 'white',
    title: 'White',
  },
  {
    name: 'blue',
    title: 'Blue',
  },
];

const QUANTITY_LIST = range(1, 5);

async function ProductIdPage({ params }: Props) {
  const { product } = await getProductById(params.id);

  const images = [
    product?.photo,
    product?.photo,
    product?.photo,
    product?.photo,
    product?.photo,
  ];

  const rating = 3;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12">
          <div className="grid gap-4 items-start">
            <h1 className="font-bold text-2xl sm:text-3xl">
              Acme Prism T-Shirt: The Modern Blend of Style and Comfort
            </h1>
            <div className="flex md items-start">
              <Rating value={rating} />
              <div className="text-4xl font-bold ml-auto">
                {product?.price}
                {' грн'}
              </div>
            </div>
            <form className="grid gap-4 md:gap-10">
              <RadioButtons label="Color" value={colors} />
              <RadioButtons label="Size" value={sizes} />
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUANTITY_LIST.map((el) => <SelectItem value={el.toString()}>{el}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg">Add to cart</Button>
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
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default ProductIdPage;

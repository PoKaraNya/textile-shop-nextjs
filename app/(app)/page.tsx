import Link from 'next/link';
import { getCategories } from '@/lib/api/categories/queries';
import { CategoryHomeGrid } from '@/components/categories/CategoryHomeGrid';
import { Category } from '@/lib/db/schema/categories';
import { CategoryHomeList } from '@/components/categories/CategoryHomeList';
import { getProducts } from '@/lib/api/products/queries';
import { ProductHomeGrid } from '@/components/products/ProductHomeGrid';

export default async function LandingPage() {
  const { categories } = await getCategories();
  const { products } = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-6">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">

              <img
                alt="Product"
                className="aspect-square object-cover rounded-t-lg mx-aut rounded-xl o sm:w-full lg:order-last lg:aspect-square"
                src="/pictures/hero3.jpg"
              />

              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover timeless textile treasures
                  </h1>
                  <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                    Explore our curated collection of high-quality textile goods, from luxurious fabrics to handcrafted
                    home decor.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                    href="/products"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12">
          <div className="container px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Experience Comfort. Discover Style.
                </h2>
                <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Marina&#39;s Heat Store offers a wide selection of quality and stylish textiles that add comfort and
                  elegance to any home. Our products include:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <img
                alt="Product"
                className="mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last"
                src="/pictures/hero1.jpg"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Bed linen</h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Bedding sets using the best materials, which ensure a comfortable sleep and rest.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Towels</h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Soft and fluffy towels with high absorbency, ideal for the bathroom.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Clothes and blankets</h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Stylish and comfortable clothing for the home, suitable for leisure or everyday use.
                        Plaids made of pleasant materials that provide warmth and comfort during cold evenings.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        <section className="w-full py-12">
          <div className="container grid  lg:grid-cols-4 gap-6 px-4 md:px-6">
            <ProductHomeGrid products={products.slice(0, 4)} />
          </div>
        </section>

        <div className="flex flex-col items-center justify-center space-y-4 text-center p-10">
          <div className="space-y-2">
            <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
              We have a variety of designs and colors for every taste and preference of customers.
              The textile products we sell are made of high-quality materials that ensure durability and preserve the
              brightness of colors after washing.
            </p>
          </div>
        </div>

        <div className="w-full dark:bg-gray-800">
          <div className="container grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 px-4 md:px-6">
            <CategoryHomeGrid categories={categories.slice(0, 3)} />
            <div className="bg-bg-dark rounded-lg shadow-lg p-6 dark:bg-gray-950">
              <h3 className="text-lg font-bold mb-4">Shop by Category</h3>
              <nav className="space-y-2">
                {categories.map((product: Category) => (
                  <CategoryHomeList category={product} key={product.id} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </main>
      <div className="pattern-background" />
      <footer
        className="text-bg-light bg-app-secondary flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 "
      >
        <p className="text-xs  dark:text-neutral-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

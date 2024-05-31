import Link from 'next/link';

export default function LandingPage() {
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
                    href="#"
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  We have a variety of designs and colors for every taste and preference of customers.
                  The textile products we sell are made of high-quality materials that ensure durability and preserve the brightness of colors after washing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
            <div
              className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <img
                alt="Product"
                className="aspect-square cover rounded-t-lg"
                src="/pictures/c1.jpg"
              />
              <div className="p-4 bg-white dark:bg-gray-950">
                <h3 className="text-lg font-bold">Linen Throw Pillow</h3>
                <p className="text-gray-500 dark:text-gray-400">$29.99</p>
              </div>
            </div>
            <div
              className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <img
                alt="Product"
                className="aspect-square cover rounded-t-lg"
                src="/pictures/c2.jpg"
              />
              <div className="p-4 bg-white cover dark:bg-gray-950">
                <h3 className="text-lg font-bold">Cotton Bath Towel</h3>
                <p className="text-gray-500 dark:text-gray-400">$19.99</p>
              </div>
            </div>
            <div
              className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <img
                alt="Product"
                className="aspect-square cover rounded-t-lg"
                src="/pictures/с3.jpg"
              />
              <div className="p-4 bg-white dark:bg-gray-950">
                <h3 className="text-lg font-bold">Silk Scarf</h3>
                <p className="text-gray-500 dark:text-gray-400">$39.99</p>
              </div>
            </div>
            <div
              className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <img
                alt="Product"
                className="aspect-square object-cover rounded-t-lg"
                src="/pictures/с4.jpg"
              />
              <div className="p-4 bg-white dark:bg-gray-950">
                <h3 className="text-lg font-bold">Wool Blanket</h3>
                <p className="text-gray-500 dark:text-gray-400">$59.99</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 border-t pb-20">
          <div className="container px-4 ">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Sign Up for Updates
                </h2>
                <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                  Stay updated with the latest product news and updates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-app-secondary px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full dark:bg-gray-800">
          <div className="container grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div
                className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
              >
                <img
                  alt="Product"
                  className="aspect-square cover rounded-t-lg"
                  src="/pictures/c5.jpg"
                />
                <div className="p-4 bg-white dark:bg-gray-950">
                  <h3 className="text-lg font-bold">Plates</h3>
                </div>
              </div>
              <div
                className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
              >
                <img
                  alt="Product"
                  className="aspect-square cover rounded-t-lg"
                  src="/pictures/c6.jpg"
                />
                <div className="p-4 bg-white dark:bg-gray-950">
                  <h3 className="text-lg font-bold">Linens</h3>
                </div>
              </div>
              <div
                className="rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
              >
                <img
                  alt="Product"
                  className="aspect-square cover rounded-t-lg"
                  src="/pictures/c7.jpg"
                />
                <div className="p-4 bg-white dark:bg-gray-950">
                  <h3 className="text-lg font-bold">Kitchen towels</h3>
                </div>
              </div>

            </div>
            <div className="bg-bg-dark rounded-lg shadow-lg p-6 dark:bg-gray-950">
              <h3 className="text-lg font-bold mb-4">Shop by Category</h3>
              <nav className="space-y-2">
                <Link
                  className="flex items-center justify-between text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span>Bedding</span>

                </Link>
                <Link
                  className="flex items-center justify-between text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span>Bath</span>

                </Link>
                <Link
                  className="flex items-center justify-between text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span>Kitchen</span>

                </Link>
                <Link
                  className="flex items-center justify-between text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span>Decor</span>

                </Link>
                <Link
                  className="flex items-center justify-between text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span>Apparel</span>

                </Link>
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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MenuIcon, SearchIcon, ShirtIcon, ShoppingCartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getIsLoggedIn } from '@/lib/auth/utils';
import { NavbarDropdown } from '@/components/layout';
import { getCartsCount } from '@/lib/api/carts/queries';

interface Props extends PropsWithChildren {}

const links = [
  {
    href: '/products',
    label: 'Products',
    icon: ShirtIcon,
  },
  {
    href: '/categories',
    label: 'Categories',
    icon: ShoppingCartIcon,
  },
] as const;

export default async function AppLayout({ children }: Props) {
  const productsInCart = await getCartsCount();

  const isLoggedIn = await getIsLoggedIn();

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 sm:px-6 lg:px-8 gap-5">
        <div className="flex items-center gap-4">
          <Link className="w-28" href="/">
            Marina shop
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="relative flex w-full max-w-md items-center lg:max-w-none">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            className="h-10 w-full rounded-md border border-gray-300 bg-gray-100 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
            placeholder="Search products..."
            type="search"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
              {productsInCart}
            </span>
          </Link>
          <NavbarDropdown isLoggedIn={isLoggedIn} />
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="ghost">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex h-full flex-col justify-between p-4">
                <nav className="grid gap-4">
                  {links.map(({ href, label, icon: Icon }) => (
                    <Link className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50" href={href}>
                      <Icon className="h-5 w-5" />
                      {label}
                    </Link>
                  ))}
                </nav>
                <div className="flex gap-4">
                  <NavbarDropdown isLoggedIn={isLoggedIn} />
                  <Link
                    className="grow flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
                    href="#"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Cart
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {children}
    </>
  );
}

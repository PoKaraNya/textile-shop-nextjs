import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}
export function LayoutContainer({ children }: Props) {
  return (
    <section className="mx-auto w-full xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl px-6">
      {children}
    </section>
  );
}

import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}
export function ListContainer({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {children}
    </div>
  );
}

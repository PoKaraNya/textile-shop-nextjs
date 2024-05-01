import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export type Action = 'create' | 'update' | 'delete';

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};

export const getRandomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export function getRandomNumber(minOrMax: number, max?: number): number {
  if (!max) {
    return Math.trunc(Math.random() * minOrMax);
  }
  return Math.trunc(Math.random() * (max - minOrMax) + minOrMax);
}

type ConnectItem = {
  connect: {
    id: string
  }
};

export const connectRandom = <T extends { id: string }>(array: T[]): ConnectItem => ({
  connect: {
    id: getRandomElement(array)?.id,
  },
});

type ManyToManyConnection<U extends string> = Record<U, ConnectItem>;

interface ConnectRandomManyOut<U extends string> {
  create: ManyToManyConnection<U>[]
}

export const connectRandomMany = <T extends { id: string }, U extends string>(array: T[], field: U, count: number): ConnectRandomManyOut<U> => {
  const create: ManyToManyConnection<U>[] = [];
  const numberOfItems = getRandomNumber(count);

  for (let i = 0; i < numberOfItems; i++) {
    const item: ManyToManyConnection<U> = {
      [field]: connectRandom(array),
    } as ManyToManyConnection<U>;
    create.push(item);
  }

  return { create };
};

export const timesAsync = async (count: number, cb: (index: number) => Promise<any>): Promise<void> => {
  for (let i = 0; i < count; ++i) {
    await cb(i);
  }
};

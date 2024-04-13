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
export const getRandomNumber = (max: number): number => Math.trunc(Math.random() * max);

import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import prisma, { db } from '@/lib/db';

jest.mock('../lib/db/index.ts', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeAll(async () => {
//   await resetDb();
//   await seedDb();
  await db.$connect();
});

beforeEach(() => {
  mockReset(prismaMock);
});

afterAll(async () => {
  await db.$disconnect();
});

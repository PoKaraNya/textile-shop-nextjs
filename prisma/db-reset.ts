import { PrismaClient } from '@prisma/client';

type TableNames = Array<{ tablename: string }>;
type Sequences = Array<{ relname: string }>;

const prisma = new PrismaClient();

export async function resetDb() {
  const tablenames = await prisma.$queryRaw<TableNames>`
  SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  const tables = tablenames
    .map(({ tablename }: any) => tablename)
    .filter((name: string) => name !== '_prisma_migrations')
    .map((name: string) => `"public"."${name}"`)
    .join(', ');
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);

  // reset all the sequences (ids)
  const sequences = await prisma.$queryRaw<Sequences>`
  SELECT c.relname FROM pg_class AS c
    JOIN pg_namespace AS n ON c.relnamespace = n.oid
  WHERE
    c.relkind='S'
  AND
    n.nspname='public';`;
  for (const { relname } of sequences) {
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "public"."${relname}" RESTART WITH 1;`);
  }
}

resetDb().finally(async () => {
  await prisma.$disconnect();
});

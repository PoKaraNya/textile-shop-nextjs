const { PrismaClient: PrismaClientReset } = require('@prisma/client');

const tableNames = ['User', 'Session', 'VerificationToken', 'Account', 'Category', 'Product', 'ProductCategory'];

const prismaReset = new PrismaClientReset();
async function resetDb() {
  for (const tableName of tableNames) {
    await prismaReset.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
  }
}

resetDb().finally(async () => {
  await prismaReset.$disconnect();
});

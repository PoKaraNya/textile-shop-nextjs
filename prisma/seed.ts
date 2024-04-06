const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const generateUsers = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const email = faker.internet.email();
    const name = faker.person.firstName();
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
      },
    });
  }
};

async function main() {
  await generateUsers(50);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const { PrismaClient: PrismaClientSeed } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prismaSeed = new PrismaClientSeed();

const generateUsers = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const email = faker.internet.email();
    const name = faker.person.firstName();
    await prismaSeed.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
      },
    });
  }
};

const generateProducts = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const title = faker.commerce.product();
    await prismaSeed.product.upsert({
      update: {},
      where: { title },
      create: {
        title,
        description: faker.commerce.productDescription(),
        price: Math.trunc(Math.random() * 10000),
      },
    });
  }
};

const generateCategory = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const title = `Category ${Math.trunc(Math.random() * 100000)}`;
    await prismaSeed.category.upsert({
      update: {},
      where: { title },
      create: {
        title,
        description: faker.commerce.productDescription(),
      },
    });
  }
};

async function seedDb() {
  await generateUsers(50);
  await generateProducts(50);
  await generateCategory(50);
}

seedDb()
  .then(async () => {
    await prismaSeed.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaSeed.$disconnect();
    process.exit(1);
  });

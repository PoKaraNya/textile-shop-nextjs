import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { getRandomElement, getRandomNumber } from '../lib/utils';

const prismaSeed = new PrismaClient();

const generateUsers = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const email = faker.internet.email();
    const name = faker.person.firstName();
    await prismaSeed.user.create({
      data: {
        email,
        name,
      },
    });
  }
};

const generateProducts = async (count: number) => {
  const categories = await prismaSeed.category.findMany();

  for (let i = 0; i < count; i++) {
    const title = `${faker.commerce.product()} ${getRandomNumber(10000)}`;
    await prismaSeed.product.create({
      data: {
        title,
        description: faker.commerce.productDescription(),
        photo: faker.image.urlPicsumPhotos(),
        price: getRandomNumber(10000),
        category: {
          connect: {
            id: getRandomElement(categories)?.id,
          },
        },
      },
    });
  }
};

const generateCategory = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const title = `Category ${getRandomNumber(10000)}`;
    await prismaSeed.category.create({
      data: {
        title,
        description: faker.commerce.productDescription(),
        photo: faker.image.urlPicsumPhotos(),
      },
    });
  }
};

async function seedDb() {
  await generateUsers(50);
  await generateCategory(10);
  await generateProducts(100);
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

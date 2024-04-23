import { createUser } from '@/lib/api/users/mutations';

test('should create new user ', async () => {
  // const feedback = {
  //   id: '1',
  //   text: 'Hello World!',
  //   rating: 5,
  //   userId: 1,
  //   productId: null,
  // };

  const newUser = {
    name: 'Test Test',
    email: 'test@test.com',
    emailVerified: new Date(),
    image: null,
    dateOfBirth: new Date(),
    successPurchases: 200,
    failPurchases: 5,
    bonuses: 0,
  };

  const user = createUser(newUser);
  console.log({ user });

  // console.log(await prismaMock.user.create({
  //   data: {
  //     name: 'Name',
  //     email: 'email@email.com',
  //   },
  // }));

  // console.log(await prismaMock.user.findMany());

  // prismaMock.feedback.create.mockResolvedValue(feedback as any);

  await expect(user).resolves.toEqual({
    id: '1',
    text: 'Hello World!',
    rating: 5,
    userId: '1',
    productId: '1',
  });
});

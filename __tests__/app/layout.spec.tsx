import { render, screen } from '@testing-library/react';
import Layout from '@/app/(app)/layout';

jest.mock('@/lib/auth/utils', () => ({
  getUserAuth: jest.fn().mockResolvedValue({
    session: {
      user: {
        name: 'John Doe',
        role: 'ADMIN',
      },
    },
  }),
}));

jest.mock('@/lib/api/carts/queries', () => ({
  getCartsCount: jest.fn().mockResolvedValue(2),
}));

jest.mock('@/components/auth/SignIn', () => () => <div>mock</div>);

describe('Layout page', () => {
  test('Should render correctly', async () => {
    render(await Layout({ children: <>mock</> }));
    const header = screen.getByText('mock');
    expect(header).toBeTruthy();
  });
});

import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/admin/dashboard/page';

jest.mock('@/lib/auth/utils', () => ({
  getUserAuth: jest.fn().mockResolvedValue({
    session: {
      user: {
        name: 'John Doe',
      },
    },
  }),
}));

jest.mock('@/components/auth/SignIn', () => () => <div>mock</div>);

describe('DashboardPage', () => {
  test('Should render correctly', async () => {
    render(await DashboardPage());
    const header = screen.getByRole('main');
    expect(header).toBeTruthy();
  });
});

import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/admin/dashboard/page';
import { expect, test } from 'vitest';

describe('DashboardPage', () => {
  test('Should render correctly', async () => {
    render(await DashboardPage());
    const header = screen.getByRole('heading');
    const headerText = 'Dashboard';

    expect(header).toHaveTextContent(headerText);
  });
});

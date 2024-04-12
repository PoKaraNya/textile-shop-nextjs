import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(app)/dashboard/page';

describe('DashboardPage', () => {
  it('Should render correctly', async () => {
    render(await DashboardPage());
    const header = screen.getByRole('heading');
    const headerText = 'Dashboard';

    expect(header).toHaveTextContent(headerText);
  });
});

import { render, screen } from '@testing-library/react';
import Products from '@/app/(app)/products/page';

jest.mock('@/lib/api/products/queries', () => ({
  getProducts: jest.fn().mockResolvedValue([]),
}));

jest.mock('@/lib/api/carts/queries', () => ({
  getProductIdsInCart: jest.fn().mockResolvedValue([]),
}));

jest.mock('@/lib/api/favorites/queries', () => ({
  getProductIdsInFavorites: jest.fn().mockResolvedValue([]),
}));

jest.mock('@/components/products', () => ({
  __esModule: true,
  ProductsGrid: jest.fn().mockReturnValue(<div>mock</div>),
}));

describe('Layout page', () => {
  test('Should render correctly', async () => {
    render(await Products());
    const header = screen.getByText('mock');
    expect(header).toBeTruthy();
  });
});

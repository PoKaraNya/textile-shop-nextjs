import React from 'react';
import { render } from '@testing-library/react';
import Loading from '@/app/(app)/loading';

describe('Loading Component', () => {
  it('renders the loading spinner', () => {
    const { getByRole, getByText } = render(<Loading />);

    // Check if the spinner element is present
    const spinner = getByRole('status');
    expect(spinner).toBeTruthy();

    // Check if the "Loading..." text is present
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeTruthy();
  });

  it('renders the correct SVG icon', () => {
    const { getByRole } = render(<Loading />);

    // Check if the SVG element is present
    const svgIcon = getByRole('status').querySelector('svg');
    expect(svgIcon).toBeTruthy();
    // You can add more specific checks for the SVG icon if needed
  });
});

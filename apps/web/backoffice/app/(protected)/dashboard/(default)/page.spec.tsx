import { render } from '@testing-library/react';
import DashbaordPage from './page';

jest.mock('react-chartjs-2', () => ({
  Doughnut: jest.fn(),
  Line: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Dashboard Page', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<DashbaordPage />);
    expect(baseElement).toBeTruthy();
  });
});

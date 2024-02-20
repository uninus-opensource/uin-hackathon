import { render } from '@testing-library/react';
import DashbaordPage from './page';

describe('Dashboard Page', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<DashbaordPage />);
    expect(baseElement).toBeTruthy();
  });
});

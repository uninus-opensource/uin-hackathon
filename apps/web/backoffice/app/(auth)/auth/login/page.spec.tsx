import { render } from '@testing-library/react';
import AuthLoginPage from './page';

describe('Auth Login Page', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<AuthLoginPage />);
    expect(baseElement).toBeTruthy();
  });
});

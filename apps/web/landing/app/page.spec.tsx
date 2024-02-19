import { render } from '@testing-library/react';
import Page from './page';

describe('Landing Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import WebComponentOrganisms from './web-component-organisms';

describe('WebComponentOrganisms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebComponentOrganisms />);
    expect(baseElement).toBeTruthy();
  });
});

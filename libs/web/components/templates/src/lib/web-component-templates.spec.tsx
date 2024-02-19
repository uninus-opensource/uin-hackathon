import { render } from '@testing-library/react';

import WebComponentTemplates from './web-component-templates';

describe('WebComponentTemplates', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebComponentTemplates />);
    expect(baseElement).toBeTruthy();
  });
});

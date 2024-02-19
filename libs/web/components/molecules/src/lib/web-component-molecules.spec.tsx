import { render } from '@testing-library/react';

import WebComponentMolecules from './web-component-molecules';

describe('WebComponentMolecules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebComponentMolecules />);
    expect(baseElement).toBeTruthy();
  });
});

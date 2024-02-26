import React from 'react';
import { render } from '@testing-library/react';
import { Fieldset } from './fieldset';

describe('Fieldset Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<Fieldset />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { InputRadio } from './radio';

describe('Input Radio Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<InputRadio />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { InputSelect } from './select';

describe('Input Select Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<InputSelect />);
    expect(baseElement).toBeTruthy();
  });
});

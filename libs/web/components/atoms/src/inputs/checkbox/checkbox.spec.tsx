import React from 'react';
import { render } from '@testing-library/react';
import { InputCheckbox } from './';

describe('Input Checkbox Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<InputCheckbox />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { InputText } from './text';

describe('Input Text Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<InputText />);
    expect(baseElement).toBeTruthy();
  });
});

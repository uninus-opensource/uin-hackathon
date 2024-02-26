import React from 'react';
import { render } from '@testing-library/react';
import { InputTextArea } from './text-area';

describe('Input Text Area Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<InputTextArea />);
    expect(baseElement).toBeTruthy();
  });
});

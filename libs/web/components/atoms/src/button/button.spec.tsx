import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './';

describe('Butto Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });
});

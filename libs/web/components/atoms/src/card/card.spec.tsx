import React from 'react';
import { render } from '@testing-library/react';
import { Card } from './card';

describe('Butto Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<Card />);
    expect(baseElement).toBeTruthy();
  });
});
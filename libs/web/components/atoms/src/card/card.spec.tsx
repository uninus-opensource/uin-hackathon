import React from 'react';
import { render } from '@testing-library/react';
import { Card } from './';

describe('Butto Component', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<Card />);
    expect(baseElement).toBeTruthy();
  });
});
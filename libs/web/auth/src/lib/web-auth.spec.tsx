import { render } from '@testing-library/react';
import { WebAuthProvider } from './web-auth.provider';
import React from 'react';

describe('WebAuth Component Test', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebAuthProvider />);
    expect(baseElement).toBeTruthy();
  });
});

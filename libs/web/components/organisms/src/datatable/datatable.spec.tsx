import React from 'react';
import { render } from '@testing-library/react';
import { DataTable } from './datatable';

describe('Data Table', () => {
  it('Should render successfully', () => {
    const { baseElement } = render(<DataTable data={[]} columns={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

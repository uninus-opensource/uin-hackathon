import { api } from './axios';

describe('axios', () => {
  it('should be defined', () => {
    expect(api).toBeDefined();
  });

  it('should be returned from axios', () => {
    expect(api).toBeInstanceOf(Object);
  });
});

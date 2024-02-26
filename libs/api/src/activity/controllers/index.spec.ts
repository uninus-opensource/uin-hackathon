describe('AppController', () => {
  it('should return a number of 5', () => {
    const x = 5;
    const y = 0;
    const expectedResult = 5;
    expect(x + y).toEqual(expectedResult);
    expect(typeof (x + y)).toBe('number');
  });
});

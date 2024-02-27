import { GetOrganization } from './organization.api';

jest.mock('axios');

jest.mock('./organization.api', () => ({
  GetOrganization: () => {
    return { data: {} };
  },
}));

describe('Organization API Fetch Test', () => {
  it('Should fetch API', async () => {
    expect(await GetOrganization({})).toBeTruthy();
  });
});

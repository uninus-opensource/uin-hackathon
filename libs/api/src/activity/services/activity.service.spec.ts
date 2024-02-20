import { Test } from '@nestjs/testing';

import { ActivityService } from '..';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ActivityService],
    }).compile();

    service = app.get<ActivityService>(ActivityService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});

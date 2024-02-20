import { Injectable } from '@nestjs/common';

@Injectable()
export class ProposalService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}

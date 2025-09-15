import { Injectable } from '@nestjs/common';

import { ResponseEntity } from 'src/core/domain/entities/response.entity'; 
import { AccountServicePort } from '../ports/account.service';

@Injectable()
export class FindAccountUseCase {
  constructor(private readonly accountServicePort: AccountServicePort) {}

  async execute(id: string): Promise<ResponseEntity> {
    return await this.accountServicePort.find(id);
  }
}
import { Injectable } from '@nestjs/common';

import { ResponseEntity } from 'src/core/domain/entities/response.entity';
import { AccountServicePort } from '../ports/account.service';

@Injectable()
export class CheckHealthUseCase {
  constructor(private readonly accountServicePort: AccountServicePort) {}

  async execute(): Promise<ResponseEntity> {
    return await this.accountServicePort.checkHealth();
  }
}
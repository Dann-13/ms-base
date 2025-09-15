import { Injectable } from '@nestjs/common';

import { ResponseEntity } from 'src/core/domain/entities/response.entity';
import { AccountServicePort } from '../ports/account.service';
import { AccountQueryEntity } from '../../domain/entities/account-query.entity';

@Injectable()
export class ListAccountUseCase {
  constructor(private readonly accountServicePort: AccountServicePort) {}

  async execute(filters: AccountQueryEntity): Promise<ResponseEntity> {
    return await this.accountServicePort.list(filters);
  }
}
import { Injectable } from '@nestjs/common';

import { ResponseEntity } from 'src/core/domain/entities/response.entity'; 
import { AccountServicePort } from '../ports/account.service';
import { AccountEntity } from '../../domain/entities/account.entity';

@Injectable()
export class UpdateAccountUseCase {
  constructor(private readonly accountServicePort: AccountServicePort) {}

  async execute(id: string, data: Partial<AccountEntity>): Promise<ResponseEntity> {
    return await this.accountServicePort.update(id, data);
  }
}
import { Injectable } from '@nestjs/common';

import { ResponseEntity } from 'src/core/domain/entities/response.entity'; 
import { AccountServicePort } from '../ports/account.service';
import { AccountEntity } from '../../domain/entities/account.entity';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly accountServicePort: AccountServicePort) {}

  async execute(data: AccountEntity): Promise<ResponseEntity> {
    return await this.accountServicePort.create(data);
  }
}
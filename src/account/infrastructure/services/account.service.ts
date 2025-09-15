import { Injectable } from '@nestjs/common';

import { ResponseEntity } from '@core/domain/entities/response.entity';
import { ResponseService } from '@core/infrastructure/services/response.service';

import { AccountServicePort } from '../../application/ports/account.service';
import { IAccountRepository } from '../../domain/repositories/account.repository';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountQueryEntity } from '../../domain/entities/account-query.entity';

@Injectable()
export class AccountService implements AccountServicePort {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly responseService: ResponseService,
  ) {}

  async checkHealth(): Promise<ResponseEntity> {
    return this.responseService.success('Account service is running');
  }

  async create(data: AccountEntity): Promise<ResponseEntity> {
    const account = await this.accountRepository.create(data);
    return this.responseService.success('Cuenta contable creada exitosamente', account);
  }

  async update(id: string, data: Partial<AccountEntity>): Promise<ResponseEntity> {
    const account = await this.accountRepository.update(id, data);
    return this.responseService.success('Cuenta contable actualizada exitosamente', account);
  }

  async find(id: string): Promise<ResponseEntity> {
    const account = await this.accountRepository.find(id);
    return this.responseService.success('Cuenta contable encontrada', account);
  }

  async list(filters: AccountQueryEntity): Promise<ResponseEntity> {
    const accounts = await this.accountRepository.findAll(filters);
    return this.responseService.success('Lista de cuentas contables', accounts);
  }

  async delete(id: string): Promise<ResponseEntity> {
    await this.accountRepository.delete(id);
    return this.responseService.success('Cuenta contable eliminada exitosamente');
  }

  async select(): Promise<ResponseEntity> {
    const accounts = await this.accountRepository.select();
    return this.responseService.success('Lista de cuentas contables para selección', accounts);
  }
}
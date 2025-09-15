import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAccountRepository } from '../../domain/repositories/account.repository';
import { AccountEntity, AccountFindEntity, AccountListEntity } from '../../domain/entities/account.entity';
import { AccountQueryEntity } from '../../domain/entities/account-query.entity';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) { }

  async create(data: AccountEntity): Promise<AccountFindEntity> {
    const account = this.accountRepository.create(data);
    await this.accountRepository.save(account);
    return this.mapToFindEntity(account);
  }

  async find(id: string): Promise<AccountFindEntity> {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new Error(`Account with id ${id} not found`);
    }
    return this.mapToFindEntity(account);
  }

  async update(id: string, data: Partial<AccountEntity>): Promise<AccountFindEntity> {
    await this.accountRepository.update(id, data);
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new Error(`Account with id ${id} not found`);
    }
    return this.mapToFindEntity(account);
  }

  async findAll(filters: AccountQueryEntity): Promise<AccountListEntity[]> {
    const query = this.accountRepository.createQueryBuilder('account');

    if (filters.code) {
      query.andWhere('account.code LIKE :code', { code: `%${filters.code}%` });
    }

    if (filters.name) {
      query.andWhere('account.name LIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.page && filters.limit) {
      query.skip((filters.page - 1) * filters.limit).take(filters.limit);
    }

    const accounts = await query.getMany();
    return accounts.map(account => this.mapToListEntity(account));
  }

  async delete(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async select(): Promise<AccountListEntity[]> {
    const accounts = await this.accountRepository.find();
    return accounts.map(account => this.mapToListEntity(account));
  }

  private mapToFindEntity(account: Account): AccountFindEntity {
    return {
      id: account.id,
      code: account.code,
      name: account.name,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }

  private mapToListEntity(account: Account): AccountListEntity {
    return {
      id: account.id,
      code: account.code,
      name: account.name,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
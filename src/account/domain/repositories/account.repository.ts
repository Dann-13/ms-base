import { AccountEntity, AccountFindEntity, AccountListEntity } from '../entities/account.entity';
import { AccountQueryEntity } from '../entities/account-query.entity';

export abstract class IAccountRepository {
  abstract create(data: AccountEntity): Promise<AccountFindEntity>;
  abstract update(id: string, data: Partial<AccountEntity>): Promise<AccountFindEntity>;
  abstract find(id: string): Promise<AccountFindEntity>;
  abstract findAll(filters: AccountQueryEntity): Promise<AccountListEntity[]>;
  abstract delete(id: string): Promise<void>;
  abstract select(): Promise<AccountListEntity[]>;
}

import { ResponseEntity } from 'src/core/domain/entities/response.entity'; 
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountQueryEntity } from '../../domain/entities/account-query.entity';

export abstract class AccountServicePort {
  abstract checkHealth(): Promise<ResponseEntity>;
  abstract create(data: AccountEntity): Promise<ResponseEntity>;
  abstract update(id: string, data: Partial<AccountEntity>): Promise<ResponseEntity>;
  abstract find(id: string): Promise<ResponseEntity>;
  abstract list(filters: AccountQueryEntity): Promise<ResponseEntity>;
  abstract delete(id: string): Promise<ResponseEntity>;
  abstract select(): Promise<ResponseEntity>;
}

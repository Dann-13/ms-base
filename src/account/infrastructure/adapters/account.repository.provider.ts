import { Provider } from '@nestjs/common';

import { IAccountRepository } from 'src/account/domain/repositories/account.repository'; 
import { AccountRepository } from '../repositories/account.repository';

export const AccountRepositoryProvider: Provider = {
  provide: IAccountRepository,
  useClass: AccountRepository,
};
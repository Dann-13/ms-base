import { Provider } from '@nestjs/common';

import { AccountServicePort } from '../../application/ports/account.service';
import { AccountService } from '../services/account.service';

export const AccountServiceProvider: Provider = {
  provide: AccountServicePort,
  useClass: AccountService,
};
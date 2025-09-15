import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseServiceProvider } from 'src/core/infrastructure/adapters/providers/response-service.provider';
import { ErrorHandlerService } from 'src/core/infrastructure/services/error-handler.service'; 

import { Account } from './infrastructure/entities/account.entity';
import { AccountController } from './infrastructure/controllers/account.controller';
import { AccountRepositoryProvider } from './infrastructure/adapters/account.repository.provider';
import { AccountServiceProvider } from './infrastructure/adapters/account.service.provider';

import { CheckHealthUseCase } from './application/use-case/check-health.use-case';
import { CreateAccountUseCase } from './application/use-case/create-account.use-case';
import { UpdateAccountUseCase } from './application/use-case/update-account.use-case';
import { FindAccountUseCase } from './application/use-case/find-account.use-case';
import { ListAccountUseCase } from './application/use-case/list-account.use-case';
import { DeleteAccountUseCase } from './application/use-case/delete-account.use-case';
import { SelectAccountUseCase } from './application/use-case/select-account.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [
    ResponseServiceProvider,
    ErrorHandlerService,
    AccountRepositoryProvider,
    AccountServiceProvider,
    CheckHealthUseCase,
    CreateAccountUseCase,
    UpdateAccountUseCase,
    FindAccountUseCase,
    ListAccountUseCase,
    DeleteAccountUseCase,
    SelectAccountUseCase,
  ],
})
export class AccountModule {}
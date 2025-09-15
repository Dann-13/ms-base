import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ResponseEntity } from 'src/core/domain/entities/response.entity'; 
import { ErrorHandlerService } from 'src/core/infrastructure/services/error-handler.service'; 

import { QUEUE_MESSAGE_ACCOUNT } from '../../domain/enums/queues-account.enum';
import { CreateAccountDto, UpdateAccountDto } from '../../domain/dto';
import { FiltersAccountDto } from '../../domain/dto/filters-account.dto';

import { CheckHealthUseCase } from '../../application/use-case/check-health.use-case';
import { CreateAccountUseCase } from '../../application/use-case/create-account.use-case';
import { UpdateAccountUseCase } from '../../application/use-case/update-account.use-case';
import { FindAccountUseCase } from '../../application/use-case/find-account.use-case';
import { ListAccountUseCase } from '../../application/use-case/list-account.use-case';
import { DeleteAccountUseCase } from '../../application/use-case/delete-account.use-case';
import { SelectAccountUseCase } from '../../application/use-case/select-account.use-case';

@Controller()
export class AccountController {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly checkHealthUseCase: CheckHealthUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly findAccountUseCase: FindAccountUseCase,
    private readonly listAccountUseCase: ListAccountUseCase,
    private readonly deleteAccountUseCase: DeleteAccountUseCase,
    private readonly selectAccountUseCase: SelectAccountUseCase,
  ) {}

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.HEALTH_STATUS })
  async checkHealth(): Promise<ResponseEntity> {
    try {
      return await this.checkHealthUseCase.execute();
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.CREATE })
  async create(@Payload() payload: CreateAccountDto): Promise<ResponseEntity> {
    try {
      return await this.createAccountUseCase.execute(payload);
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.UPDATE })
  async update(
    @Payload('id', ParseUUIDPipe) id: string,
    @Payload('data') data: UpdateAccountDto,
  ): Promise<ResponseEntity> {
    try {
      return await this.updateAccountUseCase.execute(id, data);
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.FIND })
  async find(@Payload(ParseUUIDPipe) id: string): Promise<ResponseEntity> {
    try {
      return await this.findAccountUseCase.execute(id);
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.LIST })
  async list(@Payload() filters: FiltersAccountDto): Promise<ResponseEntity> {
    try {
      return await this.listAccountUseCase.execute(filters);
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.DELETE })
  async delete(@Payload(ParseUUIDPipe) id: string): Promise<ResponseEntity> {
    try {
      return await this.deleteAccountUseCase.execute(id);
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }

  @MessagePattern({ cmd: QUEUE_MESSAGE_ACCOUNT.SELECT })
  async select(): Promise<ResponseEntity> {
    try {
      return await this.selectAccountUseCase.execute();
    } catch (error) {
      return this.errorHandlerService.handle(error);
    }
  }
}
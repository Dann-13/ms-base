import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeORMModule } from './infrastructure/config/typeorm/typeorm.module';
import { ResponseServiceProvider } from './infrastructure/adapters/providers/response-service.provider'; 
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        QUEUES_URL: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeORMModule,
    AccountModule,
  ],
  providers: [ResponseServiceProvider],
})
export class CoreModule {}
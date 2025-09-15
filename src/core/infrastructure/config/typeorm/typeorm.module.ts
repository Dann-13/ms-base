import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import AppDataSource from './data-source'; 

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        await AppDataSource.initialize();
        return AppDataSource.options;
      },
    }),
  ],
})
export class TypeORMModule {}
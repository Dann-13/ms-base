import { QUEUES } from './core/domain/enums/queues.enum';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  for await (const queue of Object.values(QUEUES)) {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.QUEUES_URL!],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.startAllMicroservices();
  Logger.log('🚀 Microservices for accounting parameters are listening');
}
bootstrap();

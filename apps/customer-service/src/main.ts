import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { CustomerServiceModule } from './customer-service.module';
import { grpcClientOptions } from '../../grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(CustomerServiceModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();

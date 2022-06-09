import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './order.entity';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'apps/grpc-client.options';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test-order-service',
      entities: [Order],
      synchronize: true,
    }),
    ClientsModule.register([
      {
        name: 'CUSTOMER_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}

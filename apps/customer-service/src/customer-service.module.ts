import { Module } from '@nestjs/common';
import { CustomerServiceController } from './customer-service.controller';
import { CustomerServiceService } from './customer-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Customer from './customer.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test-customer-service',
      entities: [Customer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [CustomerServiceController],
  providers: [CustomerServiceService],
})
export class CustomerServiceModule {}

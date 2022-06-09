import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrderView } from './customer-order.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'customer-order-view',
      entities: [CustomerOrderView],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerOrderView]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

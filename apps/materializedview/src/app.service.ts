import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CustomerOrderView } from './customer-order.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CustomerOrderView)
    private customerOrderRepository: Repository<CustomerOrderView>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<CustomerOrderView[]> {
    return this.customerOrderRepository.find();
  }
}

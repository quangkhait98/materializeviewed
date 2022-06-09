import Customer from './customer.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerServiceService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Customer[]> {
    Logger.log('findAll');
    return this.customerRepository.find();
  }
}

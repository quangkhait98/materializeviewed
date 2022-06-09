import { Controller, Get, Inject, Logger } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { CustomerServiceService } from './customer-service.service';
import Customer from './customer.entity';
import { CustomerById } from './interface/customer-by-id.interface';
import * as _ from 'lodash';
@Controller()
export class CustomerServiceController {
  constructor(
    private readonly customerServiceService: CustomerServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.customerServiceService.getHello();
  }

  @GrpcMethod('CustomerService')
  async findOne(data: CustomerById): Promise<Customer> {
    const { id } = data;
    return await this.customerServiceService.findOne(id);
  }

  @GrpcStreamMethod('CustomerService')
  async findMany(
    data$: Observable<CustomerById>,
  ): Promise<Observable<Customer>> {
    Logger.log('aaaaa');
    const customer$ = new Subject<Customer>();
    const onNext = async (customerById: CustomerById) => {
      // const items = await this.customerServiceService.findAll();
      const items = [
        {
          customerId: '3c334b0f-f35d-4d43-8c22-e9805056d6db',
          name: 'kha',
          orderNumber: '3',
        },
        {
          customerId: '3c334b0f-f35d-4d43-8c22-e9805056d7db',
          name: 'kha2',
          orderNumber: '0',
        },
      ];
      console.log('items', items);
      const item = items.find(
        (customer) => customer.customerId === customerById.id,
      );
      console.log('item', item);
      customer$.next(_.pick(item, ['name']));
    };
    const onComplete = () => customer$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return customer$.asObservable();
  }
}

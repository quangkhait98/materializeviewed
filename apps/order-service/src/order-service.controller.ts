import { Controller, Get, Inject, Logger, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { OrderServiceService } from './order-service.service';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { CustomerById } from 'apps/customer-service/src/interface/customer-by-id.interface';
import Customer from 'apps/customer-service/src/customer.entity';

interface CustomerService {
  findOne(data: CustomerById): Observable<Customer>;
  findMany(upstream: Observable<CustomerById>): Observable<Customer>;
}

@Controller()
export class OrderServiceController {
  private customerService: CustomerService;
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject('CUSTOMER_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.customerService =
      this.client.getService<CustomerService>('CustomerService');
  }

  @Get('/acb')
  getMany(): Observable<Customer[]> {
    Logger.log('getMany');
    const ids$ = new ReplaySubject<CustomerById>();
    ids$.next({ id: '3c334b0f-f35d-4d43-8c22-e9805056d7db' });
    ids$.next({ id: '3c334b0f-f35d-4d43-8c22-e9805056d6db' });
    ids$.complete();

    const stream = this.customerService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  // @Get(':id')
  // getCustomer(@Param('id') id: string): Observable<Customer> {
  //   console.log('id', id);
  //   return this.customerService.findOne({ id });
  // }

  @Get()
  getHello(): string {
    return this.orderServiceService.getHello();
  }
}

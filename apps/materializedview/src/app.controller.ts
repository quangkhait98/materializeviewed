import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerOrderView } from './customer-order.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<CustomerOrderView[]> {
    return this.appService.findAll();
  }
}

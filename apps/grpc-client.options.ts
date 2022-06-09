import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'customer', // ['hero', 'hero2']
    protoPath: join(__dirname, './customer.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};

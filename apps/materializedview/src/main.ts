import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as _ from 'lodash';
async function bootstrap() {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'customer-order-view',
  });

  await AppDataSource.initialize();
  await AppDataSource.query('CREATE EXTENSION IF NOT EXISTS postgres_fdw');

  await AppDataSource.query(
    `CREATE SERVER IF NOT EXISTS "order-fdw-test" FOREIGN DATA WRAPPER "postgres_fdw" OPTIONS (host 'localhost', dbname 'test-order-service')`,
  );
  await AppDataSource.query(
    `CREATE USER MAPPING IF NOT EXISTS FOR PUBLIC SERVER "order-fdw-test" OPTIONS (user 'root',password 'root')`,
  );

  await AppDataSource.query(`DROP FOREIGN TABLE IF EXISTS "order" cascade`);

  await AppDataSource.query(
    `IMPORT FOREIGN SCHEMA "public" LIMIT TO ("order") FROM SERVER "order-fdw-test" INTO public`,
  );

  // // // customer service
  await AppDataSource.query(
    `CREATE SERVER IF NOT EXISTS "customer-fdw-test" FOREIGN DATA WRAPPER "postgres_fdw" OPTIONS (host 'localhost', dbname 'test-customer-service')`,
  );
  await AppDataSource.query(
    `CREATE USER MAPPING IF NOT EXISTS FOR PUBLIC SERVER "customer-fdw-test" OPTIONS (user 'root',password 'root')`,
  );
  await AppDataSource.query(`DROP FOREIGN TABLE IF EXISTS "customer" cascade`);
  // const rawOrder = await AppDataSource.query(
  //   'SELECT * FROM public."order" limit 1',
  // );
  // if (_.isEmpty(rawOrder)) {
  //   await AppDataSource.query(
  //     `IMPORT FOREIGN SCHEMA "public" LIMIT TO ("customer") FROM SERVER "customer-fdw-test" INTO public`,
  //   );
  // }
  await AppDataSource.query(
    `IMPORT FOREIGN SCHEMA "public" LIMIT TO ("customer") FROM SERVER "customer-fdw-test" INTO public`,
  );
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();

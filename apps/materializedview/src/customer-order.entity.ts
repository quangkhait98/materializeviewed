import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `SELECT "customer".id as "customerId", name as name, count("order"."customerId") as "orderNumber"
	FROM public.customer left Join "order" on "customer"."id" = "order"."customerId"::uuid
	group by "customer".id, "name", "credit"`,
  materialized: true,
})
export class CustomerOrderView {
  @ViewColumn()
  customerId: string;

  @ViewColumn()
  name: number;

  @ViewColumn()
  orderNumber: number;
}

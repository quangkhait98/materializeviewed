import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntitys } from '../../base-entity';
@Entity()
class Order extends BaseEntitys {
  @Column()
  public customerId: string;

  @Column()
  public status: string;

  @Column({ nullable: false, default: 0 })
  public total: number;

  constructor(id?: string) {
    super();
    this.id = id;
  }
}
export default Order;

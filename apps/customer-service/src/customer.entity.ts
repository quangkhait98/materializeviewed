import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntitys } from '../../base-entity';
@Entity()
class Customer extends BaseEntitys {
  @Column()
  public name: string;

  @Column({ nullable: false, default: 0 })
  public credit: number;

  constructor(id?: string) {
    super();
    this.id = id;
  }
}
export default Customer;

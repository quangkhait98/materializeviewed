import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  AfterUpdate,
} from 'typeorm';
import { IsOptional, IsUUID } from 'class-validator';

export class BaseEntitys {
  @BeforeUpdate()
  async update(): Promise<void> {
    this.updatedAt = new Date();
  }
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  id?: string;
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;
  @CreateDateColumn({ nullable: true })
  updatedAt?: Date;
  @Column({ nullable: false, default: false })
  isDeleted?: boolean;
}

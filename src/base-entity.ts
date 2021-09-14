import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { getDateThai } from './utils/date.utils';

export class BaseEntity {
  // auto incressment
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: getDateThai(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
    default: getDateThai(),
  })
  updatedAt: Date;
}

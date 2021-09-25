import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('Company')
export class Company extends BaseEntity {
  @Column({ type: String, nullable: false, default: '' })
  company_name: string;

  @Column({ type: String, nullable: false, default: '' })
  taxno: string;

  @Column({ type: String, nullable: false, default: '' })
  logo: string;

  @Column({ type: String, nullable: false, default: '' })
  address: string;

  @Column({ type: String, nullable: false, default: '' })
  amphur: string;

  @Column({ type: String, nullable: false, default: '' })
  thumbon: string;

  @Column({ type: Number, nullable: false, default: 0 })
  province_id: number;

  @Column({ type: String, nullable: false, default: '' })
  email: string;

  @Column({ type: String, nullable: false, default: '' })
  telephone: string;

  @Column({ type: String, nullable: false, default: '' })
  line: string;

  @Column({ type: Number, nullable: false, default: 0 })
  user_id: number;

  @Column({ type: Number, nullable: false, default: 0 })
  zipcode: number;
}

import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: String, nullable: false, default: '' })
  name: string;

  @Column({ type: String, nullable: false, default: '' })
  username: string;

  @Column({ type: String, nullable: false, default: '' })
  password: string;

  @Column({ type: String, nullable: false, default: '' })
  email: string;

  @Column({ type: Number, nullable: false, default: 0 })
  admin_id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: String, nullable: false, default: '' })
  api_token: string;

  //   @ManyToOne(() => Province, (province: Province) => province.id)
  //   @JoinColumn({
  //     name: 'provinceid',
  //   })
}

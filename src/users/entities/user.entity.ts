import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {}

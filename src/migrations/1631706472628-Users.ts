import { MigrationInterface, QueryRunner } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

export class Users1631706472628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user: any = 'admin@gmail.com';
    const password: string = this.hashPassword('12345678');
    await queryRunner.query(
      `INSERT INTO users(name,username,email,password,role) VALUES('Admin', 'admin',
       '${user}','${password}','admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  public hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }
}

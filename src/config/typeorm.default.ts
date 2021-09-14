import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv');

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '',
  username: '',
  password: '',
  port: 5432,
  database: '',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  //   ssl: {
  //     rejectUnauthorized: false,
  //     ca: fs.readFileSync('ca-certificate.crt').toString(),
  //   },
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  // migrationsRun: true,
  cli: {
    migrationsDir: 'migrations',
  },
};

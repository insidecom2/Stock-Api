import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),
    MulterModule.register({
      dest: './public/images/',
    }),
    UsersModule,
    AuthModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

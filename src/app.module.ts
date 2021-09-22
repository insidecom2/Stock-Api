import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

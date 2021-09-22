import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { returnApi } from 'src/utils/utils';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<any> {
    const createUser: any = await this.userRepo.create(createUserDto);
    if (createUser) return returnApi(true, createUser);
    else return returnApi(false, '', 'cannot create user');
  }

  async findAll() {
    const data: any = await this.userRepo.find();
    return returnApi(true, data);
  }

  async findOne(id: number) {
    const data: any = await this.userRepo.findOne(id);
    return returnApi(true, data);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const getData: any = await this.userRepo.findOne(id);
    const newData: any = { ...getData, updateUserDto };
    const update: any = await this.userRepo.update(id, newData);
    if (update) return returnApi(true, update);
    else return returnApi(false, '', 'cannot update user');
  }

  async remove(id: number) {
    const update: any = await this.userRepo.delete(id);
  }

  async findOneByEmail(email: string): Promise<any> {
    const checkname = await this.userRepo.findOne({
      email: email,
    });
    if (checkname) return checkname;
    else return false;
  }

  async validatePassword(
    inputPassword: string,
    password: string,
  ): Promise<boolean> {
    return compareSync(inputPassword, password);
  }

  async tokenUpdate(id, token): Promise<boolean> {
    const updateUser: any = await this.userRepo.update(id, token);
    if (updateUser) return true;
    else return false;
  }
}

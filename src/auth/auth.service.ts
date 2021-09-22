import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { returnApi } from 'src/utils/utils';
import { UsersService } from '../users/users.service';
import { LoginAuthDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return { statusCode: 400, message: 'email invalid' };
    }
    const validatePassword = await this.usersService.validatePassword(
      password,
      user.password,
    );

    if (user && validatePassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginAuthDTO: LoginAuthDTO): Promise<any> {
    const checkname = await this.usersService.findOneByEmail(
      loginAuthDTO.email,
    );
    if (!checkname) throw new NotFoundException('email invalid');

    const token = this.jwtService.sign({
      email: checkname.email,
      role: checkname.role.name,
      id: checkname.id,
      roleId: checkname.role.id,
      sub: {
        createdAt: checkname.createdAt,
        updatedAt: checkname.updatedAt,
      },
    });
    await this.usersService.tokenUpdate(checkname.id, { api_token: token });
    returnApi(true, {
      access_token: token,
      id: checkname.id,
      token_type: 'Bearer',
    });
  }
}

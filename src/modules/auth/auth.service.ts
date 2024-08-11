import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SuccessRes } from 'src/utils/success-response';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}
  register(userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  async login(loginData: LoginUserDto) {
    const user = await this.userService.findOne({ email: loginData.email });
    if (!user) throw new NotFoundException();
    const token = {
      access_token: this.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      } as JwtPayload),
    };

    return SuccessRes(token);
  }
}

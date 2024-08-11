import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerData: CreateUserDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }
}

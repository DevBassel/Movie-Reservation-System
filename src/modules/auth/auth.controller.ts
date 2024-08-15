import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerData: CreateUserDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }
}

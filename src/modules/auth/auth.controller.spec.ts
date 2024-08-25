import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EmailsService } from '../emails/emails.service';

describe('AuthController', () => {
  const USER_REPO_TOKEN = getRepositoryToken(User);
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UsersService,
        EmailsService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined auth controller', () => {
    expect(controller).toBeDefined();
  });

  it('register endpoint should be defuend ', async () => {
    expect(controller.register).toBeDefined();
  });

  it('login endpoint should be defuend', async () => {
    expect(controller.login).toBeDefined();
  });
});

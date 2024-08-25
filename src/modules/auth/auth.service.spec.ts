import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { EmailsService } from '../emails/emails.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  const USER_REPO_TOKEN = getRepositoryToken(User);
  let userRepo: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        EmailsService,
        UsersService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<User>>(USER_REPO_TOKEN);
  });

  it('should be defined auth service', () => {
    expect(service).toBeDefined();
  });

  it('user repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  it('should be register user', async () => {
    const payloda: CreateUserDto = {
      name: '',
      email: '',
      password: '',
    };
    const output = { msg: 'users is created' };

    jest.spyOn(service, 'register').mockResolvedValue(output);

    expect(await service.register(payloda)).toBe(output);
  });

  it('should be login user', async () => {
    const payload: LoginUserDto = {
      email: 'email@gmail.com',
      password: '123456789',
    };
    const result = {
      access_token: 'JWT token',
    };

    jest.spyOn(service, 'login').mockResolvedValue(result);

    expect(await service.login(payload)).toBe(result);
  });
});

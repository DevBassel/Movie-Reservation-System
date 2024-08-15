import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  const USER_REPO_TOKEN = getRepositoryToken(User);
  let userRepo: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
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

  it('user repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

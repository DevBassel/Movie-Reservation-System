import { TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RootTestingModule } from 'test/utils/root-test.module.spec';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleType } from '../auth/enums/roleType.enum';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { SetAdminType } from './types/set-admin.type';

const USER_MOCK: CreateUserDto = {
  name: 'bassel',
  email: 'bassel@gmail.com',
  password: '123456789',
};

const USER: User = {
  id: 'uuid',
  name: 'bassel',
  email: 'bassel@gmail.com',
  password: '123456789',
  role: RoleType.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
};
describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get(getRepositoryToken(User));
  });

  it('users repo should be defiend', () => {
    expect(userRepo).toBeDefined();
  });

  it('users service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user should be defiend', async () => {
    const result = { msg: 'user is created' };
    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await service.create(USER_MOCK)).toBe(result);
  });

  it('update user should be defiend', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce(USER);
    expect(await service.update(USER.id, USER_MOCK)).toBe(USER);
  });

  it('set  user as an ADNIN should be defiend', async () => {
    const result = { msg: 'user now is admin' };
    jest.spyOn(service, 'setAdmin').mockResolvedValueOnce(result);
    expect(await service.setAdmin(USER.id, SetAdminType.UP)).toBe(result);
  });

  it('find all users should be defiend', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([USER]);
    expect(await service.findAll()).toStrictEqual([USER]);
  });

  it('find  user should be defiend', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(USER);
    expect(await service.findOne({ id: USER.id })).toStrictEqual(USER);
  });

  it('delete  user should be defiend', async () => {
    const result: DeleteResult = {
      affected: 1,
      raw: [],
    };
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await service.remove(USER.id)).toStrictEqual(result);
  });
});

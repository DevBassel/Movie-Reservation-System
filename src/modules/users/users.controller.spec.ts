import { TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    controller = module.get<UsersController>(UsersController);
  });

  it('user controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users endpoint should be defined', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('find one user endpoint should be defined', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('get user Profile endpoint should be defined', () => {
    expect(controller.getProfile).toBeDefined();
  });

  it('set user an  ADMIN endpoint should be defined', () => {
    expect(controller.setAdmin).toBeDefined();
  });

  it('update user endpoint should be defined', () => {
    expect(controller.update).toBeDefined();
  });

  it('remove user endpoint should be defined', () => {
    expect(controller.remove).toBeDefined();
  });
});

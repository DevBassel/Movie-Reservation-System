import { TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

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

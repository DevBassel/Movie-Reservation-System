import { TestingModule } from '@nestjs/testing';
import { ReservatController } from './reservat.controller';
import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('ReservatController', () => {
  let controller: ReservatController;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    controller = module.get<ReservatController>(ReservatController);
  });

  it('reservat controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all reservat of user endpoint should be defined', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('find  reservat of user endpoint should be defined', () => {
    expect(controller.findOne).toBeDefined();
  });
});

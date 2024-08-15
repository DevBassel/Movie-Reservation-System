import { Test, TestingModule } from '@nestjs/testing';
import { ReservatController } from './reservat.controller';
import { ReservatService } from './reservat.service';

describe('ReservatController', () => {
  let controller: ReservatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservatController],
      providers: [ReservatService],
    }).compile();

    controller = module.get<ReservatController>(ReservatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

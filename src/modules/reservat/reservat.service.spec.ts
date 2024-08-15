import { Test, TestingModule } from '@nestjs/testing';
import { ReservatService } from './reservat.service';

describe('ReservatService', () => {
  let service: ReservatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservatService],
    }).compile();

    service = module.get<ReservatService>(ReservatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

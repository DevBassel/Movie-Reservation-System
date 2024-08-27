import { TestingModule } from '@nestjs/testing';
import { SchedulingService } from './scheduling.service';
import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('SchedulingService', () => {
  let service: SchedulingService;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();
    service = module.get<SchedulingService>(SchedulingService);
  });

  it('scheduling should be defined', () => {
    expect(service).toBeDefined();
  });

  it('scheduling commingMovie should be defined', async () => {
    jest.spyOn(service, 'commingMovie').mockResolvedValue();
    expect(service.commingMovie).toBeDefined();
    expect(await service.commingMovie()).toBeUndefined();
  });
});

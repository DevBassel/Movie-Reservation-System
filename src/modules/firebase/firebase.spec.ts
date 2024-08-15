import { Test, TestingModule } from '@nestjs/testing';
import { Firebase } from './firebase';

describe('Firebase', () => {
  let provider: Firebase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Firebase],
    }).compile();

    provider = module.get<Firebase>(Firebase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

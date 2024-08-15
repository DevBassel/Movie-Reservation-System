import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';

describe('MediaService', () => {
  let service: MediaService;
  const MEDIA_REPO_TOKEN = getRepositoryToken(Media);
  let mediaRepo: Repository<Media>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: MEDIA_REPO_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    mediaRepo = module.get<Repository<Media>>(MEDIA_REPO_TOKEN);
  });

  it('media repo should be defined', () => {
    expect(mediaRepo).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});

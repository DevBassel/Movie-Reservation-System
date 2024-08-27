import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';

describe('MediaService', () => {
  let service: MediaService;
  const MEDIA_REPO_TOKEN = getRepositoryToken(Media);
  let mediaRepo: Repository<Media>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        FirebaseService,
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

  it('create media should be defiened', async () => {
    let file: Express.Multer.File;

    const result: Media = {
      id: 'uuid',
      url: 'http://filename',
      cloudId: 'filename__datenow',
      format: 'jpeg',
    };

    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await service.create(file)).toBe(result);
  });

  it('delete media should be defiend', async () => {
    const fileId = 'file__ID';
    jest.spyOn(service, 'delete').mockResolvedValue(true);

    expect(await service.delete(fileId)).toBe(true);
  });
});

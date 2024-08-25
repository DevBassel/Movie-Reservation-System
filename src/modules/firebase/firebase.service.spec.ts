import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('firebase service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uploade file to firestore', async () => {
    let file: Express.Multer.File;

    const result = {
      name: 'fileName',
      url: 'file URL',
      format: 'file format',
    };

    jest.spyOn(service, 'uploadFile').mockResolvedValue(result);

    expect(await service.uploadFile(file)).toBe(result);
  });

  it('delete file from firestore', async () => {
    const fileName: string = 'fileName';

    jest.spyOn(service, 'deleteFile').mockResolvedValue(true);

    expect(await service.deleteFile(fileName)).toBeTruthy();
  });
});

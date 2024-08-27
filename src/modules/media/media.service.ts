import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private readonly mediaRepo: Repository<Media>,
    private readonly firebaseService: FirebaseService,
  ) {}
  async create(file: Express.Multer.File) {
    try {
      if (!file)
        throw new BadRequestException('movie poster shoulde be provide');
      const upload = await this.firebaseService.uploadFile(file);

      return this.mediaRepo.save({
        cloudId: upload.name,
        url: upload.url,
        format: upload.format,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async delete(fileName: string) {
    await this.firebaseService.deleteFile(fileName);
    await this.mediaRepo.delete({ cloudId: fileName });
    return true;
  }
}

import { Injectable } from '@nestjs/common';
import * as FB from 'firebase-admin';
import sharp from 'sharp';
import { v4 } from 'uuid';

@Injectable()
export class FirebaseService {
  private readonly config =
    process.env.SERVICEACCOUNT && JSON.parse(process.env.SERVICEACCOUNT);

  private readonly admin =
    this.config &&
    FB.initializeApp({
      credential: FB.credential.cert(this.config),
      storageBucket: `${this.config.project_id}.appspot.com`,
    });

  private bucket = this.admin && this.admin.storage().bucket();

  async uploadFile(file: Express.Multer.File) {
    const fileName = `movies-posters/${v4()}__${new Date().toISOString()}`;

    const fileUpload = this.bucket.file(fileName);

    if (file.mimetype.split('/')[0] === 'image') {
      file.buffer = await sharp(file.buffer)
        .resize(1000)
        .webp({ quality: 80 })
        .toBuffer();
    }

    await fileUpload.save(file.buffer, {
      public: true,
      metadata: {
        contentType: 'image/webp',
      },
    });

    return {
      name: fileName,
      url: `https://storage.googleapis.com/${this.bucket.name}/${fileName}`,
      format: file.mimetype,
    };
  }

  async deleteFile(fileName: string) {
    const file = this.bucket.file(fileName);

    try {
      await file.delete();
      console.log('file deleted');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

import { Readable } from 'typeorm/platform/PlatformTools';

export const file: Express.Multer.File = {
  fieldname: 'poster',
  originalname: 'test.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  size: 1234,
  buffer: Buffer.from([]),
  stream: new Readable(),
  destination: '',
  filename: '',
  path: '',
};

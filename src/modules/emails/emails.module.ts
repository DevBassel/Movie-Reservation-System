import { Global, Module } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Global()
@Module({
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}

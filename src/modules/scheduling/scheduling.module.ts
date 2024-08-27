import { Module, OnModuleInit } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { ReservatModule } from '../reservat/reservat.module';

@Module({
  imports: [ReservatModule],
  providers: [SchedulingService],
})
export class SchedulingModule implements OnModuleInit {
  constructor(private readonly schedulingService: SchedulingService) {}
  onModuleInit() {
    // send emails to users for comming reservats
    this.schedulingService.commingMovie();
  }
}

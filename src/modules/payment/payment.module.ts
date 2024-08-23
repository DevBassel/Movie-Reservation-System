import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrderModule } from '../order/order.module';
import { ReservatModule } from '../reservat/reservat.module';

@Module({
  imports: [OrderModule, ReservatModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

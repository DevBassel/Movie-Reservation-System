import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MoviesModule } from '../movies/movies.module';
import { PaymentModule } from '../payment/payment.module';
import { ReservatModule } from '../reservat/reservat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    MoviesModule,
    forwardRef(() => PaymentModule),
    ReservatModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}

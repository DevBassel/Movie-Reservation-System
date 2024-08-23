import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthRequest } from 'src/interfaces/auth-request';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtGuard)
  @Post('pay')
  pay(@Body() payload: CreatePaymentDto, @Req() req: AuthRequest) {
    return this.paymentService.pay(payload.orderId, req.user);
  }

  @Post('webhook')
  confirm(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sin: string,
  ) {
    return this.paymentService.webhook(req, sin);
  }
}

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { OrderStatus } from '../order/enums/order-status.enum';
import { ReservatService } from '../reservat/reservat.service';
import { Order } from '../order/entities/order.entity';
import { EmailsService } from '../emails/emails.service';
import { SucccessPaymentTemp } from '../emails/templates/success-payment.template';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(process.env.STRIPE_SK);
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
    private readonly reservatService: ReservatService,
    private readonly emailsService: EmailsService,
  ) {}

  async pay(orderId: string, user: JwtPayload) {
    const order = await this.orderService.findOne(orderId, user.id);
    if (order.status === OrderStatus.SUCCESSED)
      throw new BadRequestException('this order already payed');

    const create = await this.stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: order.total * 100,
      currency: 'USD',
      metadata: {
        orderId,
        userId: user.id,
        email: user.email,
      },
    });

    await this.orderService.update(order.id, { paymentId: create.id });

    return create;
  }

  async cancelPayment(order: Order) {
    const refund = await this.stripe.refunds.create({
      payment_intent: order.paymentId,
    });
    return refund;
  }

  async webhook(req: RawBodyRequest<Request>, sin: string) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sin,
        process.env.STRIPE_WEBHOOK_SK,
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return;
    }
    // Handle the event
    const dataObject = event.data.object;

    if ('metadata' in dataObject) {
      const metadata = dataObject.metadata;

      switch (event.type) {
        case 'payment_intent.canceled':
          console.log('payment is cnaceled');
          await this.orderService.update(metadata.orderId, {
            status: OrderStatus.CANCELED,
          });
          break;

        case 'payment_intent.payment_failed':
          await this.orderService.update(metadata.orderId, {
            status: OrderStatus.FAILED,
          });
          break;

        case 'payment_intent.succeeded':
          this.successPaymentHandel(metadata);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    }
  }

  async successPaymentHandel(metadata: any) {
    console.log('payment is succeeded');
    const order = await this.orderService.findOne(
      metadata.orderId,
      metadata.userID,
    );

    const reservat = await this.reservatService.create(
      {
        movieId: order.movieId,
        seats: order.seats,
      },
      metadata.userId,
    );

    await this.orderService.update(metadata.orderId, {
      status: OrderStatus.SUCCESSED,
      reservatId: reservat.id,
    });

    this.emailsService.sendEmail({
      to: metadata.email,
      subject: 'success payment',
      html: SucccessPaymentTemp(
        metadata.orderId,
        reservat.movieId,
        reservat.seats,
      ),
    });
  }
}

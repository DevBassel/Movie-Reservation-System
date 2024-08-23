import { Injectable, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { OrderStatus } from '../order/enums/order-status.enum';
import { ReservatService } from '../reservat/reservat.service';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(process.env.STRIPE_SK);
  constructor(
    private readonly orderService: OrderService,
    private readonly reservatService: ReservatService,
  ) {}

  async pay(orderId: string, user: JwtPayload) {
    const order = await this.orderService.findOne(orderId, user.id);

    const create = await this.stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: order.total * 100,
      currency: 'USD',
      metadata: { orderId, userId: user.id },
    });

    return create;
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
          console.log('payment is failed');
          await this.orderService.update(metadata.orderId, {
            status: OrderStatus.FAILED,
          });
          break;

        case 'payment_intent.succeeded':
          console.log('payment is succeeded');
          await this.orderService.update(metadata.orderId, {
            status: OrderStatus.SUCCESSED,
          });
          const order = await this.orderService.findOne(
            metadata.movieId,
            metadata.userId,
          );
          console.log({ order });
          await this.reservatService.create(
            {
              movieId: order.movieId,
              seats: order.seats,
            },
            metadata.userId,
          );
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    }
  }
}

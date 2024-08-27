import {
  BadRequestException,
  ConflictException,
  forwardRef,
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { OrderStatus } from './enums/order-status.enum';
import { MoviesService } from '../movies/movies.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaymentService } from '../payment/payment.service';
import { ReservatService } from '../reservat/reservat.service';
import { EmailsService } from '../emails/emails.service';
import { createOrderTemp } from '../emails/templates/create-order.template';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly movieService: MoviesService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
    private readonly reservateService: ReservatService,
    private readonly emailsService: EmailsService,
  ) {}
  async create({ movieId, seats }: CreateOrderDto, user: JwtPayload) {
    const checkOrder = await this.orderRepo.existsBy({
      movieId,
      userId: user.id,
    });

    if (checkOrder)
      throw new ConflictException(
        'movie has been in order go to complete payment or canceled',
      );

    const movie = await this.movieService.findOne(movieId);

    // check if movis show time is't time out
    const currentDate = Date.now();
    const showtime = movie.showtime.getTime();
    if (showtime < currentDate) throw new GoneException('rwservat is time out');

    const avilableSeats = movie.seats - movie.reservs;
    if (avilableSeats < seats)
      throw new BadRequestException(
        `no more seats, we have a ${movie.seats} seats avilable`,
      );

    const order = await this.orderRepo.save({
      movieId,
      userId: user.id,
      total: movie.price * seats,
      seats,
      status: OrderStatus.PENDING,
    });
    this.emailsService.sendEmail({
      to: user.email,
      subject: 'create order',
      html: createOrderTemp(order.id, movie, user.name),
    });
    return { msg: 'order is created' };
  }

  findAll(user: JwtPayload) {
    return this.orderRepo.find({
      where: { userId: user.id },
      select: [
        'id',
        'seats',
        'total',
        'status',
        'reservatId',
        'movieId',
        'createdAt',
        'paymentId',
      ],
    });
  }

  findOne(id: string, userId: string) {
    return this.orderRepo.findOne({
      where: { id, userId },
      relations: ['movie'],
      select: [
        'id',
        'total',
        'userId',
        'status',
        'seats',
        'reservatId',
        'movie',
        'movieId',
        'paymentId',
      ],
    });
  }

  async update(id: string, data: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({ id });
    await this.orderRepo.save({ ...order, ...data });
    return { msg: 'order has been updated' };
  }

  async remove(id: string, user: JwtPayload) {
    const order = await this.findOne(id, user.id);
    if (!order) throw new NotFoundException('order not found');

    await this.reservateService.remove(order.reservatId, user);

    await this.paymentService.cancelPayment(order.paymentId);

    return this.orderRepo.delete({ id, userId: user.id });
  }
}

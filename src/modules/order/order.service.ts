import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { OrderStatus } from './enums/order-status.enum';
import { MoviesService } from '../movies/movies.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly movieService: MoviesService,
  ) {}
  async create({ movieId, seats }: CreateOrderDto, user: JwtPayload) {
    const checkOrder = await this.orderRepo.existsBy({ movieId });

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

    await this.orderRepo.save({
      movieId,
      userId: user.id,
      total: movie.price * seats,
      seats,
      status: OrderStatus.PENDING,
    });
    return { msg: 'order is created go to complet payment' };
  }

  findAll(user: JwtPayload) {
    return this.orderRepo.find({
      where: { userId: user.id },
      select: ['id', 'seats', 'total', 'status', 'movieId', 'createdAt'],
    });
  }

  findOne(id: string, userId: string) {
    return this.orderRepo.findOne({
      where: { id, userId },
      relations: ['movie'],
      select: ['id', 'total', 'userId', 'seats', 'movie', 'movieId'],
    });
  }

  async update(id: string, data: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({ id });
    return this.orderRepo.save({ ...order, ...data });
  }

  remove(id: string, user: JwtPayload) {
    return this.orderRepo.delete({ id, userId: user.id });
  }
}

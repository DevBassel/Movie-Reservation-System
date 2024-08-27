import { TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { RootTestingModule } from 'test/utils/root-test.module.spec';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { Movie } from '../movies/entities/movie.entity';
import { User } from '../users/entities/user.entity';
import { Reservat } from '../reservat/entities/reservat.entity';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const ORDER_MOCK: CreateOrderDto = {
  movieId: 'uuid',
  seats: 4,
};
const ORDER_RESULT: Order = {
  movieId: '62b1b5cf-e549-4765-a57e-2ab05bbdecf0',
  userId: '6d2fa068-08f4-4c05-9880-6813381e3869',
  total: 40,
  seats: 4,
  status: OrderStatus.PENDING,
  paymentId: null,
  reservatId: null,
  id: '876a6962-f4ca-4c68-873f-11c33f98b4b5',
  createdAt: new Date(),
  movie: new Movie(),
  user: new User(),
  reservat: new Reservat(),
};
const USER: JwtPayload = {
  id: 'uuid',
  name: 'bassel',
  email: 'bassel@gmail.com',
  role: 'user',
};

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();
    service = module.get<OrderService>(OrderService);
    orderRepo = module.get(getRepositoryToken(Order));
  });

  it('order repo should be deifiend', () => {
    expect(orderRepo).toBeDefined();
  });

  it('order service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create order should be defiend', async () => {
    const result = { msg: 'order is created' };
    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await service.create(ORDER_MOCK, USER)).toBe(result);
  });

  it('updeat order should be defiend', async () => {
    const payloda: UpdateOrderDto = {
      reservatId: 'reservat ID',
      paymentId: 'reservat ID',
      seats: 2,
    };
    const result = { msg: 'order has been updated' };
    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await service.update('order_ID', payloda)).toBe(result);
  });

  it('find one order should be defiend', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(ORDER_RESULT);

    expect(await service.findOne('order_ID', USER.id)).toBe(ORDER_RESULT);
  });

  it('find all order of user should be defiend', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([ORDER_RESULT]);
    expect(await service.findAll(USER)).toStrictEqual([ORDER_RESULT]);
  });

  it('cancel order should be defiend', async () => {
    const result: DeleteResult = {
      raw: [],
      affected: 1,
    };
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await service.remove('order_id', USER)).toBe(result);
  });
});

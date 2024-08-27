import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { CategoryController } from 'src/modules/category/category.controller';
import { CategoryService } from 'src/modules/category/category.service';
import { Category } from 'src/modules/category/entities/category.entity';
import { EmailsService } from 'src/modules/emails/emails.service';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import { Media } from 'src/modules/media/entities/media.entity';
import { MediaService } from 'src/modules/media/media.service';
import { Movie } from 'src/modules/movies/entities/movie.entity';
import { MoviesController } from 'src/modules/movies/movies.controller';
import { MoviesService } from 'src/modules/movies/movies.service';
import { Order } from 'src/modules/order/entities/order.entity';
import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';
import { PaymentController } from 'src/modules/payment/payment.controller';
import { PaymentService } from 'src/modules/payment/payment.service';
import { Reservat } from 'src/modules/reservat/entities/reservat.entity';
import { ReservatController } from 'src/modules/reservat/reservat.controller';
import { ReservatService } from 'src/modules/reservat/reservat.service';
import { SchedulingService } from 'src/modules/scheduling/scheduling.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';

const values = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
};
export async function RootTestingModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    controllers: [
      AuthController,
      UsersController,
      CategoryController,
      MoviesController,
      OrderController,
      PaymentController,
      ReservatController,
    ],
    providers: [
      OrderService,
      MediaService,
      PaymentService,
      MoviesService,
      ReservatService,
      EmailsService,
      CategoryService,
      FirebaseService,
      AuthService,
      JwtService,
      EmailsService,
      UsersService,
      SchedulingService,
      {
        provide: getRepositoryToken(User),
        useValue: values,
      },
      {
        provide: getRepositoryToken(Order),
        useValue: values,
      },
      {
        provide: getRepositoryToken(Movie),
        useValue: values,
      },
      {
        provide: getRepositoryToken(Media),
        useValue: values,
      },
      {
        provide: getRepositoryToken(Reservat),
        useValue: values,
      },
      {
        provide: getRepositoryToken(Category),
        useValue: values,
      },
    ],
  }).compile();
}

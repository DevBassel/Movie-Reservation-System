import { TestingModule } from '@nestjs/testing';
import { ReservatService } from './reservat.service';
import { RootTestingModule } from 'test/utils/root-test.module.spec';
import { DeleteResult, Repository } from 'typeorm';
import { Reservat } from './entities/reservat.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateReservatDto } from './dto/create-reservat.dto';
import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/entities/movie.entity';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';

const RESERVAT_MOCK: CreateReservatDto = {
  movieId: 'movie_uuid',
  seats: 4,
};
const RESERVAT: Reservat = {
  id: '',
  user: new User(),
  userId: '',
  movie: new Movie(),
  seats: 0,
  movieId: '',
  createdAt: new Date(),
};
const USER: JwtPayload = {
  id: 'uuid',
  name: 'bassel',
  email: 'bassel@gmail.com',
  role: 'user',
};
describe('ReservatService', () => {
  let service: ReservatService;
  let reservatRepo: Repository<Reservat>;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    service = module.get<ReservatService>(ReservatService);
    reservatRepo = module.get(getRepositoryToken(Reservat));
  });

  it('reservat repo should be defined', () => {
    expect(reservatRepo).toBeDefined();
  });

  it('reservate service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create reservat should be defiend', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(RESERVAT);
    expect(await service.create(RESERVAT_MOCK, USER.id)).toBe(RESERVAT);
  });

  it('find all reservt of user shouldbe defiend', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([RESERVAT]);
    expect(await service.findAll(USER));
  });

  it('find one reservat  shouldbe defiend', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(RESERVAT);
    expect(await service.findOne(RESERVAT.id, USER)).toBe(RESERVAT);
  });

  it('remove reservat should be defiend', async () => {
    const result: DeleteResult = {
      affected: 1,
      raw: [],
    };
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await service.remove(RESERVAT.id, USER)).toBe(result);
  });
});

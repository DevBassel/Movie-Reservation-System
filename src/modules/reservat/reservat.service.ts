import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservatDto } from './dto/create-reservat.dto';
import { Reservat } from './entities/reservat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';

@Injectable()
export class ReservatService {
  constructor(
    @InjectRepository(Reservat)
    private readonly reservatRepo: Repository<Reservat>,
    private readonly movieService: MoviesService,
  ) {}
  async create({ movieId }: CreateReservatDto, user: JwtPayload) {
    const checkMovie = await this.movieService.findOne(movieId);
    if (!checkMovie) throw new NotFoundException('this movie not found');

    if (checkMovie.reservs >= checkMovie.seats)
      throw new BadRequestException('seats has been completed!!');

    const checkReservat = await this.reservatRepo.existsBy({ movieId });

    if (checkReservat)
      throw new ConflictException('this move has been reservat');

    const reservat = await this.reservatRepo.save({ movieId, userId: user.id });

    await this.movieService.update(checkMovie.id, {
      reservs: checkMovie.reservs + 1,
    });

    return reservat;
  }

  findAll(user: JwtPayload) {
    return this.reservatRepo.findBy({ userId: user.id });
  }

  findOne(id: string, user: JwtPayload) {
    return this.reservatRepo
      .createQueryBuilder('reservat')
      .where('reservat.id = :id AND reservat.userId = :userId', {
        id,
        userId: user.id,
      })
      .leftJoinAndSelect('reservat.movie', 'movie')
      .leftJoinAndSelect('movie.poster', 'poster')
      .select([
        'reservat.id',
        'reservat.createdAt',
        'movie.id',
        'movie.title',
        'movie.discription',
        'movie.showtime',
        'movie.seats',
        'movie.reservs',
        'poster.id',
        'poster.url',
      ])
      .getOne();
  }

  async remove(id: string, user: JwtPayload) {
    const reservat = await this.findOne(id, user);

    if (!reservat) throw new NotFoundException();

    await this.movieService.update(reservat.movie.id, {
      reservs: reservat.movie.reservs - 1,
    });

    return this.reservatRepo.delete({ userId: user.id, id });
  }
}

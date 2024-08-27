import { Injectable, NotFoundException } from '@nestjs/common';
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

  create({ movieId, seats }: CreateReservatDto, userId: string) {
    return this.reservatRepo.save({
      movieId,
      userId,
      seats,
    });
  }

  findAll(user: JwtPayload) {
    const Q = this.reservatRepo
      .createQueryBuilder('reservat')
      .leftJoinAndSelect('reservat.movie', 'movie')
      .leftJoinAndSelect('movie.poster', 'poster')
      .where('reservat.userId = :id', { id: user.id })
      // don't kill performans with select *
      .select([
        'reservat.id',
        'reservat.createdAt',
        'reservat.seats',
        'movie.id',
        'movie.title',
        'movie.showtime',
        'poster.url',
      ]);

    return Q.getMany();
  }

  findAllOfUssers(showtime: Date, currentDate: Date) {
    const Q = this.reservatRepo
      .createQueryBuilder('reservat')
      .leftJoinAndSelect('reservat.movie', 'movie')
      .leftJoinAndSelect('reservat.user', 'user')
      .leftJoinAndSelect('movie.poster', 'poster')
      .where('movie.showtime BETWEEN :currentDate AND :showtime', {
        currentDate,
        showtime,
      })
      .select([
        'reservat.id',
        'reservat.seats',
        'reservat.createdAt',
        'user.id',
        'user.name',
        'user.email',
        'movie.id',
        'movie.title',
        'movie.showtime',
        'poster.url',
      ]);

    return Q.getMany();
  }

  async findOne(id: string, user: JwtPayload) {
    const reservat = await this.reservatRepo
      .createQueryBuilder('reservat')
      .where('reservat.id = :id AND reservat.userId = :userId', {
        id,
        userId: user.id,
      })
      .leftJoinAndSelect('reservat.movie', 'movie')
      .leftJoinAndSelect('movie.poster', 'poster')
      // don't kill performans with select *
      .select([
        'reservat.id',
        'reservat.createdAt',
        'reservat.seats',
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

    if (!reservat) throw new NotFoundException('reservat not found');

    return reservat;
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

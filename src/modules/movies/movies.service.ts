import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    return this.movieRepo.save(createMovieDto);
  }

  findAll() {
    return this.movieRepo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.category', 'category')
      .select([
        'movie.id',
        'movie.title',
        'movie.discription',
        'movie.poster',
        'movie.showtime',
        'movie.seats',
        'movie.createdAt',
        'category.id',
        'category.name',
      ])
      .getMany();
  }

  findOne(id: string) {
    return this.movieRepo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.category', 'category')
      .where('movie.id = :id', { id })
      .select([
        'movie.id',
        'movie.title',
        'movie.discription',
        'movie.poster',
        'movie.showtime',
        'movie.seats',
        'movie.createdAt',
        'category.id',
        'category.name',
      ])
      .getOne();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    if (!Movie) throw new NotFoundException();

    return this.movieRepo.save({ ...movie, ...updateMovieDto });
  }

  remove(id: string) {
    return this.movieRepo.delete({ id });
  }
}

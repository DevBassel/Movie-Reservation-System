import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Brackets, Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { CategoryService } from '../category/category.service';
import { pagination } from 'src/utils/pagination';
import { MoviesFilter } from './interfaces/movies-filters.interface';
import { isDateString } from 'class-validator';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
    private readonly mediaService: MediaService,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createMovieDto: CreateMovieDto, poster: Express.Multer.File) {
    const checkCategory = await this.categoryService.findOne(
      createMovieDto.categoryId,
    );

    if (!checkCategory) throw new NotFoundException('category not found');

    const media = await this.mediaService.create(poster);
    return this.movieRepo.save({ ...createMovieDto, poster: media });
  }

  findAll(page: number, limit: number, filter: MoviesFilter) {
    const Q = this.movieRepo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.category', 'category')
      .leftJoinAndSelect('movie.poster', 'poster')
      .select([
        'movie.id',
        'movie.title',
        'movie.discription',
        'movie.poster',
        'movie.showtime',
        'movie.seats',
        'movie.price',
        'movie.reservs',
        'movie.createdAt',
        'category.id',
        'category.name',
        'poster.id',
        'poster.url',
      ]);

    filter.category &&
      Q.andWhere('category.name = :categoryName', {
        categoryName: filter.category,
      });

    // filter with between tow dates
    if (isDateString(filter.showTime)) {
      // if not provide start Date to serch 'll return current date
      const currentDate = filter.betweenTime
        ? new Date(filter.betweenTime)
        : new Date().toISOString();

      const targetDate = new Date(filter.showTime);

      Q.andWhere('movie.showtime BETWEEN :currentDate AND :targetDate', {
        currentDate,
        targetDate,
      });
    }

    // serch with movie name
    if (filter.name) {
      Q.andWhere(
        new Brackets((qb) =>
          qb.andWhere('LOWER(movie.title) LIKE LOWER(:serch)', {
            serch: `%${filter.name}%`,
          }),
        ),
      );
    }

    return pagination(Q, page, limit);
  }

  async findOne(id: string) {
    const movie = await this.movieRepo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.poster', 'poster')
      .leftJoinAndSelect('movie.category', 'category')
      .where('movie.id = :id', { id })
      .select([
        'movie.id',
        'movie.title',
        'movie.discription',
        'movie.showtime',
        'movie.seats',
        'movie.reservs',
        'movie.price',
        'movie.createdAt',
        'category.id',
        'category.name',
        'poster.id',
        'poster.url',
        'poster.cloudId',
        'poster.format',
      ])
      .getOne();

    if (!movie) throw new NotFoundException('movie not found');

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    return this.movieRepo.save({ ...movie, ...updateMovieDto });
  }

  async updatePoster(id: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('new poster should be provide');

    const movie = await this.findOne(id);
    await this.mediaService.delete(movie.poster.cloudId);
    const newPoster = await this.mediaService.create(file);

    return this.movieRepo.save({ ...movie, poster: newPoster });
  }

  remove(id: string) {
    return this.movieRepo.delete({ id });
  }
}

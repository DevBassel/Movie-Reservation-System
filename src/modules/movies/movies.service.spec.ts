import { TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Media } from '../media/entities/media.entity';
import { Category } from '../category/entities/category.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesFilter } from './interfaces/movies-filters.interface';
import { file } from 'test/utils/testFile';
import { RootTestingModule } from 'test/utils/root-test.module.spec';

const MOVIE_MOCK = {
  title: '',
  discription: '',
  categoryId: '',
  price: 0,
  showtime: undefined,
  seats: 0,
};

const MOVIE_RESULT: Movie = {
  id: 'uuid',
  title: 'movie title',
  poster: new Media(),
  discription: 'movie dis',
  showtime: undefined,
  category: new Category(),
  categoryId: 'cat uuid',
  seats: 20,
  price: 10,
  reservs: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('MoviesService', () => {
  let service: MoviesService;
  const MOVIE_REPO_TOKEN = getRepositoryToken(Movie);
  let movieRepo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    service = module.get<MoviesService>(MoviesService);
    movieRepo = module.get<Repository<Movie>>(MOVIE_REPO_TOKEN);
  });

  it('movie repo should be defined', () => {
    expect(movieRepo).toBeDefined();
  });

  it('movie service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create movie should be defiend', async () => {
    const payload: CreateMovieDto = MOVIE_MOCK;

    jest.spyOn(service, 'create').mockResolvedValue(MOVIE_RESULT);

    expect(await service.create(payload, file)).toBe(MOVIE_RESULT);
  });

  it('update movie should be defiend', async () => {
    const payload = MOVIE_MOCK as UpdateMovieDto;

    jest.spyOn(service, 'update').mockResolvedValue(MOVIE_RESULT);

    expect(await service.update('movie_uuid', payload)).toBe(MOVIE_RESULT);
  });

  it('update movie poster should be defiend', async () => {
    jest.spyOn(service, 'updatePoster').mockResolvedValue(MOVIE_RESULT);

    expect(await service.updatePoster('movie_uuid', file)).toBe(MOVIE_RESULT);
  });

  it('find all movies should be defiend', async () => {
    const result = {
      data: [MOVIE_RESULT],
      total: 10,
      pages: 1,
      page: 1,
      limit: 10,
    };
    const filter: MoviesFilter = {
      category: 'anime',
      name: 'deth note',
      showTime: new Date(),
      betweenTime: new Date(),
    };
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await service.findAll(1, 10, filter)).toBe(result);
  });

  it('find one movie should be defiend', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(MOVIE_RESULT);
    expect(await service.findOne('movie_id')).toBe(MOVIE_RESULT);
  });

  it('delete movie should be defiend', async () => {
    const result: DeleteResult = {
      raw: undefined,
      affected: 1,
    };
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await service.remove('movie_uuid')).toBe(result);
  });
});

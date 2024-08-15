import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

describe('MoviesService', () => {
  let service: MoviesService;
  const MOVIE_REPO_TOKEN = getRepositoryToken(Movie);
  let movieRepo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MOVIE_REPO_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepo = module.get<Repository<Movie>>(MOVIE_REPO_TOKEN);
  });

  it('movie repo should be defined', () => {
    expect(movieRepo).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

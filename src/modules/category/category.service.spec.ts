import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

describe('CategoryService', () => {
  let service: CategoryService;
  const CATEGORY_REPO_TOKEN = getRepositoryToken(Category);
  let categoryRepo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CATEGORY_REPO_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepo = module.get<Repository<Category>>(CATEGORY_REPO_TOKEN);
  });

  it('category repo should be defined', () => {
    expect(categoryRepo).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

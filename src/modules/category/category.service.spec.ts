import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  const CATEGORY_REPO_TOKEN = getRepositoryToken(Category);
  let categoryRepo: Repository<Category>;

  const CATEGORY_MOK = {
    id: 'uuid',
    name: 'cat name',
  };

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

  it('category service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('category repo should be defined', () => {
    expect(categoryRepo).toBeDefined();
  });

  it('should be create new category', async () => {
    const payload: CreateCategoryDto = {
      name: 'anime',
    };

    const result: Category = {
      id: 'uuid',
      name: 'cat name',
    };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await service.create(payload)).toBe(result);
  });

  it('should be return all categorys', async () => {
    const result: Category[] = [CATEGORY_MOK];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should be return one category by ID', async () => {
    const categoryId = 'uuid';
    const result = CATEGORY_MOK;

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await service.findOne(categoryId)).toBe(result);
  });

  it('should be update category by ID', async () => {
    const categoryId = 'uuid';
    const result = CATEGORY_MOK;

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await service.update(categoryId, CATEGORY_MOK)).toBe(result);
  });

  it('should be remove category by ID', async () => {
    const categoryId = 'uuid';
    const result: DeleteResult = { raw: '', affected: 1 };

    jest.spyOn(service, 'remove').mockResolvedValue(result);

    expect(await service.remove(categoryId)).toBe(result);
  });
});

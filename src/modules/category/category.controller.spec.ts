import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  const CATEGORY_REPO_TOKEN = getRepositoryToken(Category);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: CATEGORY_REPO_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('category controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create category endpoint should be defined', () => {
    expect(controller.create).toBeDefined();
  });

  it('find all category endpoint should be defined', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('find one category endpoint should be defined', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('update category endpoint should be defined', () => {
    expect(controller.update).toBeDefined();
  });

  it('remove category endpoint should be defined', () => {
    expect(controller.remove).toBeDefined();
  });
});

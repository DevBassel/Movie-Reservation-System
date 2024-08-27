import { TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';

import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('MoviesController', () => {
  let controller: MoviesController;
  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('movie controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create movie endpoint should be defined', () => {
    expect(controller.create).toBeDefined();
  });

  it('update movie endpoint should be defined', () => {
    expect(controller.update).toBeDefined();
  });

  it('update movie poster endpoint should be defined', () => {
    expect(controller.updatePoster).toBeDefined();
  });

  it('find all movie  endpoint should be defined', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('find one movie  endpoint should be defined', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('delete  movie  endpoint should be defined', () => {
    expect(controller.remove).toBeDefined();
  });
});

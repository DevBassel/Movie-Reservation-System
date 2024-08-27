import { TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';

import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    controller = module.get<OrderController>(OrderController);
  });

  it('order controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create order endpoint should be defined', () => {
    expect(controller.create).toBeDefined();
  });

  it('find all order of user endpoint should be defined', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('find one order of user endpoint should be defined', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('cancel order of user endpoint should be defined', () => {
    expect(controller.remove).toBeDefined();
  });
});

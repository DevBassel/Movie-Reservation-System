import { TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { RootTestingModule } from 'test/utils/root-test.module.spec';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('payment controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create payment intent endpoint should be defined', () => {
    expect(controller.pay).toBeDefined();
  });

  it('confirm payment intent endpoint should be defined', () => {
    expect(controller.confirm).toBeDefined();
  });
});

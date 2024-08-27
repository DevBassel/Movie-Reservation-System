import { TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { RootTestingModule } from 'test/utils/root-test.module.spec';
import { JwtPayload } from '../auth/dto/jwt-payload.dto';
import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';

const USER: JwtPayload = {
  id: 'uuid',
  name: 'bassel',
  email: 'bassel@gmail.com',
  role: 'user',
};
describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await RootTestingModule();
    service = module.get<PaymentService>(PaymentService);
  });

  it('payment service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create payment intent should be defiend', async () => {
    const result = {
      paymentId: 'pi_ksjxmx.',
      amount: 10000,
      client_secret: 'client_secret',
    };
    jest.spyOn(service, 'pay').mockResolvedValue(result);
    expect(await service.pay('order_ID', USER)).toBe(result);
  });

  it('cancel payment and refund should be defiend', async () => {
    const result = {
      status: 'success',
      paymentId: 'pi_lscnruncnc',
      amount: 1000,
    };
    jest.spyOn(service, 'cancelPayment').mockResolvedValue(result);
    expect(await service.cancelPayment('pi_jsnsn')).toBe(result);
  });

  it('payment web hook should be defiend', async () => {
    const req = {
      rawBody: Buffer.from([]),
    } as RawBodyRequest<Request>;
    jest.spyOn(service, 'webhook').mockResolvedValue();
    expect(service.webhook(req, 'sig'));
  });
});

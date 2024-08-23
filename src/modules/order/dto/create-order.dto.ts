import { Type } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  movieId: string;

  @IsNumber()
  @Type(() => Number)
  seats: number;
}

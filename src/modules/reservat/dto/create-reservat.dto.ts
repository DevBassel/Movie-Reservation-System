import { IsUUID } from 'class-validator';

export class CreateReservatDto {
  @IsUUID()
  movieId: string;
}

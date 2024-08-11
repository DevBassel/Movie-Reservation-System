import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(2, 32)
  title: string;

  @IsString()
  @Length(2, 32)
  poster: string;

  @IsString()
  @Length(2, 255)
  discription: string;

  @IsUUID()
  categoryId: string;

  @IsDateString()
  showtime: Date;

  @IsNumber()
  @Type(() => Number)
  seats: number;
}

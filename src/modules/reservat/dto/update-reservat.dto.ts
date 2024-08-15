import { PartialType } from '@nestjs/mapped-types';
import { CreateReservatDto } from './create-reservat.dto';

export class UpdateReservatDto extends PartialType(CreateReservatDto) {}

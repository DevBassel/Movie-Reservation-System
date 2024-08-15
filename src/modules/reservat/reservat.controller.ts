import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservatService } from './reservat.service';
import { CreateReservatDto } from './dto/create-reservat.dto';
import { AuthRequest } from 'src/utils/auth-request';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('reservat')
export class ReservatController {
  constructor(private readonly reservatService: ReservatService) {}

  @Post()
  create(
    @Body() createReservatDto: CreateReservatDto,
    @Req() req: AuthRequest,
  ) {
    return this.reservatService.create(createReservatDto, req.user);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.reservatService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.reservatService.findOne(id, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.reservatService.remove(id, req.user);
  }
}

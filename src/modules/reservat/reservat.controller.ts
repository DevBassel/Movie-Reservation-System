import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ReservatService } from './reservat.service';
import { AuthRequest } from 'src/interfaces/auth-request';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('reservat')
export class ReservatController {
  constructor(private readonly reservatService: ReservatService) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.reservatService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.reservatService.findOne(id, req.user);
  }
}

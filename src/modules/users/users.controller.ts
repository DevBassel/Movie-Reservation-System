import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { SetRoles } from 'src/decorator/role.decorator';
import { RoleType } from '../auth/enums/roleType.enum';
import { AuthRequest } from 'src/interfaces/auth-request';
import { SetAdminType } from './types/set-admin.type';

@Controller('users')
@UseGuards(JwtGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SetRoles(RoleType.SUPER_ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    return this.usersService.findOne({ id: req.user.id });
  }

  @Get('profile/:id')
  @SetRoles(RoleType.SUPER_ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/admin')
  @SetRoles(RoleType.SUPER_ADMIN)
  setAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
    @Query('type') type: SetAdminType,
  ) {
    return this.usersService.setAdmin(userId, type);
  }

  @Delete(':id')
  @SetRoles(RoleType.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

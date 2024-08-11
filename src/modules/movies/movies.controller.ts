import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { SetRoles } from 'src/decorator/role.decorator';
import { RoleType } from '../users/enums/roleType.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
@UseGuards(JwtGuard, RoleGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @SetRoles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @UseInterceptors(FileInterceptor('poster'))
  create(
    @Body() createMovieDto: CreateMovieDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @SetRoles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @UseInterceptors(FileInterceptor('poster'))
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @SetRoles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}

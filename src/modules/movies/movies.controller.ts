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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { SetRoles } from 'src/decorator/role.decorator';
import { RoleType } from '../auth/enums/roleType.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesFilter } from './interfaces/movies-filters.interface';

@Controller('movies')
@UseGuards(JwtGuard, RoleGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @SetRoles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @UseInterceptors(FileInterceptor('poster'))
  create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    return this.moviesService.create(createMovieDto, poster);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('category') category: string,
    @Query('name') name: string,
    @Query('showTime') showTime: Date,
    @Query('betweenTime') betweenTime: Date,
  ) {
    const filter: MoviesFilter = {
      category,
      name,
      showTime,
      betweenTime,
    };
    return this.moviesService.findAll(page, limit, filter);
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

  @Patch(':id/poster')
  @SetRoles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  @UseInterceptors(FileInterceptor('poster'))
  updatePoster(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.moviesService.updatePoster(id, file);
  }

  @Delete(':id')
  @SetRoles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { ReservatService } from './reservat.service';
import { ReservatController } from './reservat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservat } from './entities/reservat.entity';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservat]), MoviesModule],
  controllers: [ReservatController],
  providers: [ReservatService],
  exports: [ReservatService],
})
export class ReservatModule {}

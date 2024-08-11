import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './modules/db/db.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from './modules/movies/movies.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    DbModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    CategoryModule,
  ],
})
export class AppModule {}

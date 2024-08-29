import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileLogger } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: ['dist/**/*.entity.js'],
        logger:
          process.env.NODE_ENV === 'dev'
            ? new FileLogger('all', {
                logPath: './logs/DB.log',
              })
            : 'debug',
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}

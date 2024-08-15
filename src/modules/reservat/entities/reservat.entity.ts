import { Movie } from 'src/modules/movies/entities/movie.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @OneToOne(() => Movie, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  movie: Movie;

  @Column()
  movieId: string;

  @CreateDateColumn()
  createdAt: Date;
}

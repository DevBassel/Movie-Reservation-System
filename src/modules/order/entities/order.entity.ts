import { Movie } from 'src/modules/movies/entities/movie.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Movie, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @Column()
  movieId: string;

  @Column({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column()
  total: number;

  @Column()
  seats: number;

  @CreateDateColumn()
  createdAt: Date;
}

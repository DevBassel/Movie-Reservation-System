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
import { OrderStatus } from '../enums/order-status.enum';
import { Reservat } from 'src/modules/reservat/entities/reservat.entity';

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

  @Column({ nullable: true })
  paymentId: string;

  @Column()
  seats: number;

  @OneToOne(() => Reservat, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reservat: Reservat;

  @Column({ nullable: true })
  reservatId: string;

  @CreateDateColumn()
  createdAt: Date;
}

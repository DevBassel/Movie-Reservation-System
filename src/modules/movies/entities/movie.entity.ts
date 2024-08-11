import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  poster: string;

  @Column()
  discription: string;

  @Column()
  showtime: Date;

  @OneToOne(() => Category, { createForeignKeyConstraints: false })
  @JoinColumn()
  category: Category;

  @Column()
  categoryId: string;

  @Column()
  seats: number;

  @Column({ default: 0 })
  reservs: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Category } from 'src/modules/category/entities/category.entity';
import { Media } from 'src/modules/media/entities/media.entity';
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

  @OneToOne(() => Media, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  poster: Media;

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

  @Column()
  price: number;

  @Column({ default: 0 })
  reservs: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

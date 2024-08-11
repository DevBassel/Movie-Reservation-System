import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly catrgoryRepo: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.catrgoryRepo.save(createCategoryDto);
  }

  findAll() {
    return this.catrgoryRepo.find({ select: ['id', 'name'] });
  }

  findOne(id: string) {
    return this.catrgoryRepo.findOne({ where: { id }, select: ['id', 'name'] });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('category not found');
    return this.catrgoryRepo.save({ ...category, ...updateCategoryDto });
  }

  remove(id: string) {
    return this.catrgoryRepo.delete({ id });
  }
}

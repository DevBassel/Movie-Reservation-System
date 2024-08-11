import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { SuccessRes } from 'src/utils/success-response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await hash(createUserDto.password, 10);
      await this.userRepo.save(createUserDto);
      return SuccessRes('users is created', 201);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('user already exist');
    }
  }

  findAll() {
    return this.userRepo.find({ select: ['id', 'email', 'name', 'role'] });
  }

  findOne({ id, email }: { id?: string; email?: string }) {
    return this.userRepo.findOne({
      where: [{ id }, { email }],
      select: ['id', 'email', 'name', 'role'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne({ id });

    return this.userRepo.save({ ...user, ...updateUserDto });
  }

  remove(id: string) {
    return this.userRepo.delete({ id });
  }
}

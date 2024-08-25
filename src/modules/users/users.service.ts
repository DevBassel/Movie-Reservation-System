import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { RoleType } from '../auth/enums/roleType.enum';
import { SetAdminType } from './types/set-admin.type';
import { EmailsService } from '../emails/emails.service';
import { JoinUserTemp } from '../emails/templates/join-user.template';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly emailsService: EmailsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await hash(createUserDto.password, 10);
      const user = await this.userRepo.save(createUserDto);
      this.emailsService.sendEmail({
        to: user.email,
        subject: 'say hi',
        html: JoinUserTemp(user.name),
      });
      return { msg: 'users is created' };
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

  async setAdmin(userId: string, type: SetAdminType) {
    const user = await this.findOne({ id: userId });
    if (!user) throw new NotFoundException('user not found');

    if (!['up', 'down'].includes(type))
      throw new BadRequestException('invalid type');

    const updated = await this.userRepo.save({
      ...user,
      role: type === 'up' ? RoleType.ADMIN : RoleType.USER,
    });

    return { msg: `${updated.name} has been an ${updated.role}` };
  }

  remove(id: string) {
    return this.userRepo.delete({ id });
  }
}

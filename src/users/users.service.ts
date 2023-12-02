import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('User already exists');
    const hashPassword = await bcrypt.hash(password, 10);
    await this.prismaService.user.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
    });

    return { data: 'User successfully created' };
  }

  findAll() {
    return `This action returns all users`;
  }
}

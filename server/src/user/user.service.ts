import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      userId: randomUUID(),
      isAuthorized: false,
      createdAt: new Date(),
    };
    await this.users.push(user);
    return user;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((el) => el.username === username);
  }

  async findOneByUserId(userId: string): Promise<User | undefined> {
    return this.users.find((el) => el.userId === userId);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

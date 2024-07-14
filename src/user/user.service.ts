import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { ForbiddenException } from 'src/utils/exception';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    throw new ForbiddenException();
    return this.users;
  }
}

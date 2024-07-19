import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { APP_CONFIG } from 'src/constant/constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const hashPwd = bcrypt.hashSync(user.password, APP_CONFIG.SALT);
    user.password = hashPwd;
    const newUser = this.usersRepository.create(user);
    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        `${error.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOneByName(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { name: username } });
  }
  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }
}

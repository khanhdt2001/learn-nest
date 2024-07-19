import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ValidationPipe } from 'src/utils/validation.pipe';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDecorator } from 'src/auth/user.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() query): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  findById(@UserDecorator() id: any): Promise<User> {
    return this.userService.findOneById(id.sub);
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }
}
// The @Controller decorator can take
// a host option to require that the HTTP host
// of the incoming requests matches some specific value.
// @Controller({ host: 'admin.example.com' })
// export class AdminController {
//   @Get()
//   index(): string {
//     return 'Admin page';
//   }
// }

// @Get()
// async findAll(): Promise<any[]> {
//   return [];
// }

// this is crazy :3, nest can do stream to query by this simple code
// @Get()
// findAll(): Observable<any[]> {
//   return of([]);
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto, ListAllEntities, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/utils/zod_validation.pipe';
import { createUserSchema } from './user.schema';
import { ValidationPipe } from 'src/utils/validation.pipe';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<User[]> {
    return this.userService.findAll();
  }
  //   To find by id can use 3 of this way
  //  option 1:
  //   @Get(':id')
  //   findById(@Req() request: Request): string {
  //     return 'This action return user by id';
  //   }
  //  option 2:
  //   @Get(':id')
  //   findById(@Param() params: any): string {
  //     console.log(params.id);
  //     return `This action return user by id: #${params.id}`;
  //   }
  //  option 3:
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): string {
    return `This action return user by id: #${id}`;
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  //   this.userService.create(createUserDto);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return `This action updates user with id: #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action remove user with id: #${id}`;
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

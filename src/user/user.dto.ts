import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: string;
}

export class ListAllEntities {
  limit: number;
  offset: number;
}

export class UpdateUserDto {
  name: string;
  dateOfBirth: string;
  gender: string;
}

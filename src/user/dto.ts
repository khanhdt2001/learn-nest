export class CreateUserDto {
  name: string;
  dateOfBirth: string;
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

import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class BadRequestExceptionCustom extends HttpException {
  constructor(data: any) {
    super(data, HttpStatus.BAD_REQUEST);
  }
}

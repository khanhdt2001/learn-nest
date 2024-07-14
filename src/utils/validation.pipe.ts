import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequestExceptionCustom } from './exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestExceptionCustom({
        errors: this.getAllConstraints(errors),
      });
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getAllConstraints(errors: ValidationError[]): string[] {
    const allConstraints: string[] = [];

    errors.forEach((error) => {
      // Extract constraints from the current error object
      const errorConstraints = Object.values(error.constraints);
      allConstraints.push(...errorConstraints); // Spread operator to add constraints

      // Recursively iterate through child errors (if any)
      if (error.children.length > 0) {
        allConstraints.push(...this.getAllConstraints(error.children));
      }
    });

    return allConstraints; // Join all constraints with comma separator
  }
}

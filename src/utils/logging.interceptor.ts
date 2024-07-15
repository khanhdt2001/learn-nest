import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadGatewayException,
  HttpException,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { BadRequestExceptionCustom, ForbiddenException } from './exception';
import { log } from 'console';
import { date } from 'zod';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      catchError((err) => {
        let status = 500;
        const response: any = {
          describtion: 'Internal server error',
        };
        status = err.status || 500;
        response.describtion = err.response || 'Internal server error';
        console.log(
          `Handle request fail: ${request.method} ${request.path} ${Date.now() - now}ms`,
        );
        return throwError(
          () => new HttpException(response, status, { cause: err }),
        );
      }),

      tap(() =>
        console.log(
          `Handle request success: ${request.method} ${request.path} ${Date.now() - now}ms`,
        ),
      ),
    );
  }
}

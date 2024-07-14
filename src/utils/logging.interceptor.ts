import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadGatewayException
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';


@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    console.log('access intercepter');

    return next
      .handle()
      .pipe(
        catchError(err => 
          // add filter here 
          // case1, case2
          // if not throw new error
          throwError(() => new BadGatewayException())),
        tap(() =>
          console.log(
            `Handle request: ${request.method} ${request.path} ${Date.now() - now}ms`,
          ),
        ),
        
      );
  }
}

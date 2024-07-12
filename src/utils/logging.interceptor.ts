import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LogginInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = Date.now()
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        console.log("access intercepter");
        
        return next.handle().pipe(
            tap(() => console.log(
                `Handle request: ${request.method} ${request.path} ${Date.now()- now}ms`
            ))
        )       
    }
}
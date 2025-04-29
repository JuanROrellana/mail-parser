import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly time: number = 10) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('TimeoutInterceptor');
    return next.handle().pipe(
      timeout(this.time),
      catchError((err) => {
        console.log('TimeoutInterceptor catchError');
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}

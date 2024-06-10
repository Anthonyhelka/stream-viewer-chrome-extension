import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {isAuthExpired} from './global-functions';

export const InterceptorSkipHeader = 'interceptorskipheader';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  payload: any;
  utcOffset = 0 - new Date().getTimezoneOffset() / 30;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers }));
    }

    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          offset: this.utcOffset.toString()
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.msg || error.error;

        console.error('Error at interceptor:', errorMessage);
        console.error(error);

        if (error.status === 401 && isAuthExpired(errorMessage)) {
          this.authService.logout();
        }
        return throwError(errorMessage);
      }));
  }
}

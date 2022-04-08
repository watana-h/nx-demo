/**
 * @name http-error.interceptor
 * @description エラーハンドリング(HTTP Response)
*/
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorItem, ErrorTarget } from '@nx-demo/api-interfaces';
import { state } from '@angular/animations';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;

         // この形式だとうまくいかないみたい
         // const errItem : ErrorItem = {
         //   errorCode: error.status,
         //   errorMessage: error.message,
         //   errorTarget: ErrorTarget.backend
         // }
         // this.router.navigate(['error'], {state: errItem});

            this.router.navigate(['error'], 
                                {state: {errorCode: error.status,
                                         errorMessage: error.message, 
                                         errorTarget: ErrorTarget.backend}});
          }
          console.log(errorMsg);
          return throwError(errorMsg);
      })
  )

  }
}

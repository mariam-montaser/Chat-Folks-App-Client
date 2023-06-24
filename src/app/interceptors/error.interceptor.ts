import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(error => {
        if (error){
          switch (error.status){
            case 400:
              const errorArr = error.error.errors;
              const newErrorArr = [];
              if(errorArr){
                for(const i in errorArr){
                  if(errorArr[i]){
                    newErrorArr.push(errorArr[i])
                  }
                }
                throw newErrorArr.flat();
              } else {
                this.showToastr(`${error.statusText}`,`${error.status}`);
              }
              break;

            case 401:
              this.showToastr(`${error.statusText}`,`${error.status}`);
              break;
            case 404:
              this.navigateTo('/notfound');
              break;
            case 500:
              let extras: NavigationExtras = {state: {error: error.error}};
              this.navigateTo('/server-error', extras);
              break;
            default:
              this.showToastr('Something unexpected went wrong');
              console.log(error);
              break;
          }
        
        }
        return throwError(error);
      })
    );
  }

  private showToastr(message: string, title: string = ''){
    this.toastr.error(message, title);
  }

  private navigateTo(url: string, extras: NavigationExtras = {}){
    this.router.navigateByUrl(url, extras);
  }

}

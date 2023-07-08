import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private toastr: ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean>{
    return this.authService.currentUser$.pipe(
      map(user => {
        console.log(user);
        
        if(user.roles.includes('Admin') || user.roles.includes('Moderator')){
          return true;
        }
        this.toastr.error('Not Found.');
      })
    );
  }
  
}

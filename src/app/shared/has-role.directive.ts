import { Directive, Input, ViewContainerRef,  TemplateRef } from '@angular/core';
import { take } from 'rxjs/operators';


import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input('appHasRole') appHasRole: string[];
  user: User

  constructor(private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, 
    private authService: AuthService) {
      this.authService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
     }

  ngOnInit() {
    if (!this.user?.roles || this.user == null){
      this.viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }


}

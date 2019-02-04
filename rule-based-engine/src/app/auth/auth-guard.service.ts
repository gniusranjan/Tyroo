import {Injectable} from '@angular/core';
// import {CanActivate, CanActivateChild} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {
  CanActivate, Router, NavigationEnd,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  public previousUrl: any;
  public enter: any = false;
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.enter){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  canActivateChild() {
    return true;
  }
}

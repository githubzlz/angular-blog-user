import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginCanActivate implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isLogin = this.loginService.checkLogin();
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
    return isLogin;
  }
}

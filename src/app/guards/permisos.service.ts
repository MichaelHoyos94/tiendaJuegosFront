import { Injectable, Inject, inject} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private tokenService:TokenService, private router:Router) { }

  /**
   * nonLogged
   */
  public nonLogged(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()){
      this.router.navigate([""]);
      return false
    }
    return true;
  }

  /**
   * isLogged
   */
  public isLogged(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.tokenService.isLogged()){
      this.router.navigate(["/login"]);
      return false
    }
    return true;
  }
}

export const NonLoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermisosService).nonLogged(next, state);
}

export const LoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermisosService).isLogged(next, state);
}
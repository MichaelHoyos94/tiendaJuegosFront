import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  rol: string = '';

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol: string = next.data["expectedRol"];
    this.rol = this.tokenService.getRol();
    if (!this.tokenService.isLogged() || expectedRol != this.rol){
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}

export const RolGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RolService).canActivate(next, state);
}
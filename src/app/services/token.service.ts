import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = "jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private user:any = null;

  constructor(private router: Router, private cookieService: CookieService) { 
    this.decodePayload();
  }

  public setToken(token: string) {
    this.cookieService.set(TOKEN_KEY, token, {path: '/', sameSite: 'Strict'});
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * getRol
   */
  public getRol() {
    if (this.user)
      return this.user.rol;
    else
      return '';
  }

  public getToken(): string | null {
    return this.cookieService.get(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.cookieService.check(TOKEN_KEY);
  }

  public login(token:string){
    this.setToken(token);
    this.decodePayload();
    this.router.navigate(["/"]);
  }

  public logout() {
    window.sessionStorage.clear();
    this.cookieService.delete(TOKEN_KEY, '/');
    this.decodePayload();
    this.router.navigate(["/login"]);
  }

  /**
   * isAdmin
   */
  public isAdmin(): boolean {
    return this.user && this.user.rol === `Admin`;
  }

  private decodePayload() {
    const token = this.getToken();
    if (token){
      try {
        const decoded = jwtDecode(token);
        this.user = decoded;
        console.log(this.user);
      } catch (error) {
        console.log(`error.`);
      }
    } else {
      console.log(`Eliminado el token.`);
      this.user = null;
    }
  }
}

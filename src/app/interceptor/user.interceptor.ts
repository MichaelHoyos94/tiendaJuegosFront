import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.includes("api/auth");
    if (!this.tokenService.isLogged() || isApiUrl){
      return next.handle(request);
    }
    let initReq = request;
    let token = this.tokenService.getToken();
    initReq = this.addToken(request, token!)
    return next.handle(initReq);
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `BEARER ${token}`)
    });
  }
}

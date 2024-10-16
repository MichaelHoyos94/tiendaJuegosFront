import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user-dto';
import { MsgDto } from '../model/msg-dto';
import { SessionDTO } from '../model/session-dto';
import { environment } from 'src/enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authRoute!:string;

  constructor(private http:HttpClient) {
    this.authRoute = `${environment.apiUrl}/auth`;
  }

  public signup(user:UserDTO):Observable<MsgDto>{
    return this.http.post<MsgDto>(
      `${this.authRoute}/signup`, user
    );
  }

  /**
   * login
   */
  public login(sesionDto:SessionDTO):Observable<MsgDto> {
    return this.http.post<MsgDto>(
      `${this.authRoute}/login`,
      sesionDto
    );
  }

  /**
   * logout
   */
  public logout() {
    
  }
}

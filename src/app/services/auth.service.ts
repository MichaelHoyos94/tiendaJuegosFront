import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user-dto';
import { MsgDto } from '../model/msg-dto';
import { SessionDTO } from '../model/session-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8081/api/v1/auth";

  constructor(private http:HttpClient) { }

  public signup(user:UserDTO):Observable<MsgDto>{
    return this.http.post<MsgDto>(
      `${this.authURL}/signup`, user
    );
  }

  /**
   * login
   */
  public login(sesionDto:SessionDTO):Observable<MsgDto> {
    return this.http.post<MsgDto>(
      `${this.authURL}/login`,
      sesionDto
    );
  }

  /**
   * logout
   */
  public logout() {
    
  }
}

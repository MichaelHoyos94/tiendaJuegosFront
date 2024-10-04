import { Injectable } from '@angular/core';
import { UserGetDTO } from '../model/user-get-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsgDto } from '../model/msg-dto';
import { UserDTO } from '../model/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = "http://localhost:8081/api/v1/users"

  constructor(private http:HttpClient) { }

  /**
   * getMe
   */
  public getMe():Observable<MsgDto> {
    return this.http.get<MsgDto>(`${this.userURL}/my-profile`);
  }
  /**
   * updateMe
   */
  public updateMe(user:UserDTO):Observable<MsgDto> {
    return this.http.patch<MsgDto>(`${this.userURL}/update-me`, user);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsgDto } from '../model/msg-dto';
import { ReviewDto } from '../model/review-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewRoute!:string;
  constructor(private http:HttpClient) { 
    this.reviewRoute = `${environment.apiUrl}/reviews`;
  }
  /**
   * makeReview
gameId:number, token:string | null   */
  public makeReview(gameId:number, review:ReviewDto):Observable<MsgDto> {
    return this.http.post<MsgDto>(`${this.reviewRoute}/new-review`, review, {
      params: {
        game: gameId
      }
    });
  }
  /**
   * getReview
   */
  public getReview(gameId:number):Observable<MsgDto> {
    return this.http.get<MsgDto>(`${this.reviewRoute}/get-review`, {
      params: {
        game: gameId
      }
    });
  }
}

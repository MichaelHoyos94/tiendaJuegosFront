import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgDto } from '../model/msg-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  purchaseRoute!:string;
  constructor(private http:HttpClient) { 
    this.purchaseRoute = "http://localhost:8081/api/v1/purchases"
  }
  /**
   * confirmPurchase
    gameId:Number, token:string | null   */
  public confirmPurchase(gameId:number):Observable<MsgDto> {
    return this.http.post<MsgDto>(`${this.purchaseRoute}/confirm-purchase`, {}, {
      params: {
        game: gameId
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { GameGetDto } from '../model/game-get-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsgDto } from '../model/msg-dto';
import { GameDto } from '../model/game-dto';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: GameGetDto[];
  private gamesURL = "http://localhost:8081/api/v1/games";
  constructor(private http:HttpClient) {
    this.games = [];
  }

  /**
   * listAllGames
   */
  public listAllGames(page:number):Observable<MsgDto> {
    return this.http.get<MsgDto>(
      `${this.gamesURL}/list-games`,
      {
        params: {
          page: page
        }
      }
    )
  }

  /**
   * listGames
   */
  public listGames():Observable<MsgDto> {
    return this.http.get<MsgDto>(`${this.gamesURL}/list-games-management`);
  }

  /**
   * listMyGames
   */
  public listMyGames():Observable<MsgDto> {
    return this.http.get<MsgDto>(`${this.gamesURL}/my-games`);
  }

  /**
   * searchGame
   * */
  public searchGame(search:string, page: number, sortBy: string[]):Observable<MsgDto> {
    return this.http.get<MsgDto>(
      `${this.gamesURL}/list-games`, 
      {
        params: {
          search: search,
          page: page,
          sortBy: sortBy
        }
      }
    );
  }

  /**
   * createGame
   */
  public createGame(game:GameDto):Observable<MsgDto> {
    return this.http.post<MsgDto>(`${this.gamesURL}/new-game`, game);
  }

  /**
   * updateGame
id: number: Observable<MsgDto>  */
  public updateGame(id: number, game: GameDto): Observable<MsgDto> {
    return this.http.patch<MsgDto>(`${this.gamesURL}/update-game`, game, {
      params: {
        id: id
      }
    });
  }

  /**
   * deleteGame
   */
  public deleteGame(id:number) {
    return this.http.delete<MsgDto>(`${this.gamesURL}/delete-game`, {
      params: {
        id: id
      }
    });
  }

  /**
   * activateGame
   */
  public activateGame(id:number) {
    return this.http.patch<MsgDto>(`${this.gamesURL}/activate-game`, {}, {
      params: {
        id: id
      }
    });
  }

  /**
   * getGame
   */
  public getGame(id:number):Observable<MsgDto>{
    return this.http.get<MsgDto>(`${this.gamesURL}/get-game?id=${id}`);
  }
}

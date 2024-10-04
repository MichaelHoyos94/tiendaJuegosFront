import { Component, OnInit } from '@angular/core';
import { GameGetDto } from 'src/app/model/game-get-dto';
import { GameService } from 'src/app/services/game.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-games-management',
  templateUrl: './games-management.component.html',
  styleUrls: ['./games-management.component.css']
})
export class GamesManagementComponent implements OnInit{
  games:GameGetDto[];
  constructor(private gameService:GameService, tokenService:TokenService){
    this.games = [];
  }
  ngOnInit(): void {
    this.loadGames();
  }

  /**
   * deleteGame
    gameId:Number   */
  public deleteGame(id:number) {
    console.log(`Tratando de eliminar.`);
    this.gameService.deleteGame(id).subscribe({
      next: data => {
        console.log(`Juego eliminado.`);
        this.loadGames();
      },
      error: error => {
        console.log(`error.`)
      }
    });
  }

  /**
   * activateGame
    id:number   */
  public activateGame(id:number) {
    console.log(`Tratando de activar.`);
    this.gameService.activateGame(id).subscribe({
      next: data => {
        console.log(`Juego activado.`);
        this.loadGames();
      },
      error: error => {
        console.log(`error.`)
      }
    });
  }

  private loadGames() {
    this.gameService.listGames().subscribe({
      next: data => {
        this.games = data.data.games;
      },
      error: error => {
        console.log("Error");
      }
    });
  }
}

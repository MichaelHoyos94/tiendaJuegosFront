import { Component, OnInit } from '@angular/core';
import { GameGetDto } from 'src/app/model/game-get-dto';
import { UserGetDTO } from 'src/app/model/user-get-dto';
import { GameService } from 'src/app/services/game.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  games!:GameGetDto[];
  totalPages!:number;
  currentPage:number = 1;

  constructor (private gameService:GameService, private tokenService:TokenService) { }
  ngOnInit(): void {
    this.loadGames();
    this.getPages();
  }
  private loadGames() {
    this.gameService.listAllGames(this.currentPage).subscribe({
      next: data => {
        this.totalPages = data.data.totalPages;
        this.games = data.data.games;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  /**
   * getPages
 :number[]  */
  public getPages():number[] {
    const pages = Array(this.totalPages).fill(0).map((_, index) => index+1);
    return pages;
  }
  /**
   * clickPage
   */
  public clickPage(page:number):void {
    this.currentPage = page;
    this.loadGames();
  }
}

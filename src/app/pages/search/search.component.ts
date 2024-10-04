import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameGetDto } from 'src/app/model/game-get-dto';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  search:string = "";
  sortBy: string[] = [];
  totalPages!: number;
  currentPage: number = 1;
  games:GameGetDto[] = [];

  constructor(private activatedRoute:ActivatedRoute, private gameService:GameService) { }
  
  ngOnInit(): void {
    this.loadSearch();
  }
  private loadSearch() {
    this.activatedRoute.params.subscribe(params => {
      this.sortBy = [];
      this.currentPage = 1;
      this.search = params['search'];
      this.loadGames();
    });
  }
  private loadGames(): void {
    this.gameService.searchGame(this.search, this.currentPage, this.sortBy).subscribe({
      next: data => {
        this.totalPages = data.data.totalPages;
        this.games = data.data.games;
      },
      error: error => {
        console.log("Error.");
      }
    });
  }
  /**
   * getPages
 : number[]  */
  public getPages(): number[] {
    const pages = Array(this.totalPages).fill(0).map((_, index) => index+1);
    return pages;
  }
  /**
   * clickPage
    page: number : void  */
  public clickPage(page: number): void {
    this.currentPage = page;
    this.loadGames();
  }
  /**
   * sort
   */
  public sort(sort: string, order: string) {
    this.sortBy = [sort, order];
    this.loadGames();
  }
}
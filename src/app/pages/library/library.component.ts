import { Component, OnInit } from '@angular/core';
import { GameGetDto } from 'src/app/model/game-get-dto';
import { GameService } from 'src/app/services/game.service';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { ReviewDto } from 'src/app/model/review-dto';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit{
  games:GameGetDto[] = [];
  selectedGame?:GameGetDto;
  selectedGameReview?:ReviewDto;
  reviewForm!:FormGroup;
  constructor(private gameService:GameService, private tokenService:TokenService, private formBuilder:FormBuilder, private reviewService:ReviewService){}
  ngOnInit(): void {
    this.loadGames();
    this.createForm();
  }
  /**
   * selectGame
   */
  public selectGame(id:number) {
    this.selectedGame = this.games.find(g => g.id === id);
    this.loadCurrentReview();
  }
  /**
   * getUrl
   */
  public getUrl():string {
    return `../../../assets/images/${this.selectedGame?.cover}`;
  }
  /**
   * haveGames
   */
  public haveGames() {
    return this.games.length > 0;
  }
  /**
   * makeReview
   */
  public makeReview() {
    if (this.selectedGame){
      this.reviewService.makeReview(this.selectedGame.id, this.reviewForm.value).subscribe({
        next: data => {
          console.log(`review done: ${data.status}`);
        },
        error: error => {
          console.log(`error`);
        }
      });
    }
  }
  private createForm() {
    this.reviewForm = this.formBuilder.group({
      review: new FormControl('', []),
      recommended: new FormControl(null, [])
    });
  }
  private loadGames() {
    this.gameService.listMyGames().subscribe({
      next: data => {
        this.games = data.data.user.Games;
        if (this.games.length > 0){
          this.selectedGame = this.games.at(0);
          this.loadCurrentReview();
        }
      },
      error: error => {
        console.log(`error`);
      }
    });
  }
  private loadCurrentReview() {
    if (this.selectedGame){
      this.reviewService.getReview(this.selectedGame.id).subscribe({
        next: data => {
          console.log(data);
          if (data.data)
            this.selectedGameReview = data.data;
          else
            this.selectedGameReview = undefined;
          console.log(this.selectedGameReview);
        },
        error: error => {
          console.log('error');
        }
      });
    }
  }
}

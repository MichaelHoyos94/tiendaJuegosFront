import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameGetDto } from 'src/app/model/game-get-dto';
import { ReviewDto } from 'src/app/model/review-dto';
import { GameService } from 'src/app/services/game.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('hidden => visible', [
        animate('0.5s')
      ]),
      transition('visible => hidden', [
        animate('0.5s')
      ])
    ])
  ]
})
export class GameDetailComponent implements OnInit{
  game!:GameGetDto;
  id!:number;
  positiveReviews: number = 0;
  negativeReviews: number = 0;
  reviews:ReviewDto[] = [];
  visibility:string = 'visible';
  currentReviewIndex:number = 0;
  constructor(private route:ActivatedRoute, private gameService:GameService, private purchaseService:PurchaseService){
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
  }
  ngOnInit(): void {
    this.loadGame();
    this.startReviewRotation();
  }
  private loadGame() {
    this.gameService.getGame(this.id).subscribe({
      next: data => {
        this.game = data.data.game;
        this.reviews = data.data.game.Reviews;
        this.countReviews();
      },
      error: error => {
        console.log("Error");
      }
    });
  }
  private countReviews() {
    this.reviews.forEach((r) => {
      if (r.recommended){
        this.positiveReviews++;
      }
      else{
        this.negativeReviews++;
      }
    });
  }
  private toggleReview() {
    this.visibility = 'hidden';
    setTimeout(() => {
      this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
      this.visibility = 'visible';
    }, 500)
  }
  private startReviewRotation() {
    setInterval(() => {
      this.toggleReview();
    }, 5000);
  }
}

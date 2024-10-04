import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameGetDto } from 'src/app/model/game-get-dto';
import { GameService } from 'src/app/services/game.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit{
  game!:GameGetDto;
  id!:number;

  constructor (private route:ActivatedRoute, private gameService:GameService, private purchaseService:PurchaseService, private tokenService:TokenService, private router:Router){ }

  ngOnInit(): void {
    this.loadGame();
  }

  /**
   * confirmPurchase
   */
  public confirmPurchase() {
    this.purchaseService.confirmPurchase(this.id).subscribe({
      next: data => {

      },
      error: error => {

      }
    });
  }

  private loadGame() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.gameService.getGame(this.id).subscribe({
        next: data => {
          this.game = data.data.game;
        },
        error: error => {
          console.log("Error");
        }
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GameDto } from 'src/app/model/game-dto';
import { TokenService } from 'src/app/services/token.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit{
  isUpdate!:boolean;
  gameId!:number;
  game!:GameDto;
  selectedCover!: File;
  createGameForm!: FormGroup;

  constructor(private route:ActivatedRoute, private gameService:GameService, private formBuilder:FormBuilder, private tokenService:TokenService, private imageService: ImageService, private router:Router) { }
  
  ngOnInit(): void {
    this.createForm();
    this.loadGame();
  }

  /**
   * createGame
   */
  public createGame() {
    this.game = this.createGameForm.value;
    if (this.isUpdate){
      this.gameService.updateGame(this.gameId, this.createGameForm.value).subscribe({
        next: data => {
          console.log(data.data);
          this.uploadCover();
          this.router.navigate(["/games-management"]);
        },
        error: error => {
          console.log('error');
        }
      });
    }
    else {
      this.gameService.createGame(this.game).subscribe({
        next: data => {
          console.log(data.data);
          this.uploadCover();
          this.router.navigate(["/games-management"]);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
  onFileChange(event:any){
    if (event.target.files.length > 0) {
      this.selectedCover = event.target.files[0];
      this.createGameForm.patchValue({
        cover: this.selectedCover.name
      });
      this.createGameForm.get('cover')?.updateValueAndValidity();
    }
  }
  private loadGame() {
    this.route.params.subscribe(params => {
      this.gameId = params["id"] || undefined;
      if (this.gameId)
        this.isUpdate = true;
      else
        this.isUpdate = false;
    });
  }
  private uploadCover(): void {
    if (this.selectedCover){
      this.imageService.uploadCover(this.selectedCover).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
  private createForm() {
    this.createGameForm = this.formBuilder.group({
      title: new FormControl("", [Validators.required]),
      cover: new FormControl(""),
      description: new FormControl(""),
      price: new FormControl("", [Validators.required])
    });
  }
}

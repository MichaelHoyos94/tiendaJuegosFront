import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GShop';
  isLogged: boolean = false;

  constructor(private router:Router, public tokenService:TokenService){ }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
  }

  /**
   * isActive
   */
  public isActive(url:string) {
    const flag: boolean = this.router.url === url;
    return flag;
  }
  /**
   * logout
   */
  public logout() {
    this.tokenService.logout();
  }
  public goSearch(search:string){
    if(search)
      this.router.navigate(["/search", search]);
  }
}

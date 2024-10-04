import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SearchComponent } from './pages/search/search.component';
import { GamesManagementComponent } from './pages/games-management/games-management.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LibraryComponent } from './pages/library/library.component';
import { LoginGuard, NonLoginGuard } from './guards/permisos.service';
import { RolGuard } from './guards/rol.service';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent, canActivate: [NonLoginGuard]},
  {path: "login", component: LoginComponent, canActivate: [NonLoginGuard]},
  {path: "my-profile", component: MyProfileComponent, canActivate: [LoginGuard]},
  {path: "games-management", component: GamesManagementComponent, canActivate: [RolGuard], data: {expectedRol: 'Admin'}},
  {path: "library", component: LibraryComponent, canActivate: [LoginGuard]},
  {path: "create-game", component: CreateGameComponent, canActivate: [RolGuard], data: {expectedRol: 'Admin'}},
  {path: "edit-game/:id", component: CreateGameComponent, canActivate: [RolGuard], data: {expectedRol: 'Admin'}},
  {path: "get-game/:id", component: GameDetailComponent},
  {path: "purchase/:id", component: PurchaseComponent, canActivate: [LoginGuard]},
  {path: "**", pathMatch: "full", redirectTo: "home"},
  {path: "search/:search", component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

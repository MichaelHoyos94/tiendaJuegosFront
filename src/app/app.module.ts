import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SearchComponent } from './pages/search/search.component';
import { GamesManagementComponent } from './pages/games-management/games-management.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { AlertComponent } from './pages/alert/alert.component';
import { LibraryComponent } from './pages/library/library.component';
import { UserInterceptor } from './interceptor/user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    MyProfileComponent,
    SearchComponent,
    GamesManagementComponent,
    CreateGameComponent,
    GameDetailComponent,
    PurchaseComponent,
    AlertComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

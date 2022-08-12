import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmComponent} from "./film/film.component";
import {FilmsComponent} from "./films/films.component";
import {LoginComponent} from "./login/login.component";
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {LoginGuard} from "./login.guard";

const routes: Routes = [
  { path: 'film/:id', component: FilmComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'login', component: LoginComponent},
  {path:'main', component: MainScreenComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

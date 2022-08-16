import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmComponent } from "./film/film.component";
import { FilmsComponent } from "./films/films.component";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'films', component: FilmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                    LoginComponent,
                                    FilmComponent,
                                    FilmsComponent
                                 ]

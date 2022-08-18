import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceComponent } from './interface/interface.component';
import { FilmComponent } from "./film/film.component";
import { FilmsComponent } from "./films/films.component";
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SeriesComponent } from './series/series.component';
import { SerieComponent } from './serie/serie.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'interface',
    component: InterfaceComponent
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'film', component: FilmComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'serie', component: SerieComponent },
  { path: 'series', component: SeriesComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                    LoginComponent,
                                    FilmComponent,
                                    FilmsComponent,
                                    SerieComponent,
                                    SeriesComponent,
                                    InterfaceComponent,
                                    PageNotFoundComponent,
                                    ProfileComponent
                                 ]

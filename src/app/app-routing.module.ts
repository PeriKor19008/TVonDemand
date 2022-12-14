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
import { EpisodesComponent } from './episodes/episodes.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { LanguagesComponent } from './languages/languages.component';
import { CategoriesComponent } from './categories/categories.component';
import { ActorsComponent } from './actors/actors.component';
import { CustomersComponent } from './customers/customers.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { UpdateDatabaseComponent } from './update-database/update-database.component';
import { IncomeComponent } from './income/income.component';
import { PriceUpdaterComponent } from './price-updater/price-updater.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'interface',
    component: InterfaceComponent,
    children:
    [
      { path: 'profile', component: ProfileComponent },
      { path: 'address', component: AddressComponent },
      { path: 'film', component: FilmComponent },
      { path: 'films', component: FilmsComponent },
      { path: 'serie', component: SerieComponent },
      { path: 'language', component: LanguagesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'episodes', component: EpisodesComponent },
      { path: 'languages', component: LanguagesComponent },
      { path: 'categories', component: CategoriesComponent},
      { path: 'actors', component: ActorsComponent},
      { path: 'cart', component: CartComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'most_popular', component: MostPopularComponent },
      { path: 'update_database', component: UpdateDatabaseComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'price_updater', component: PriceUpdaterComponent }
    ]
  },
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
                                    EpisodesComponent,
                                    LanguagesComponent,
                                    CategoriesComponent,
                                    ActorsComponent,
                                    CartComponent,
                                    InterfaceComponent,
                                    AddressComponent,
                                    CustomersComponent,
                                    PageNotFoundComponent,
                                    ProfileComponent,
                                    MostPopularComponent,
                                    UpdateDatabaseComponent,
                                    IncomeComponent,
                                    PriceUpdaterComponent
                                 ]

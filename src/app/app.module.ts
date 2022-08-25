import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilmsService } from './films.service';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module';
import { InterfaceComponent } from './interface/interface.component';
import { ProfileComponent } from './profile/profile.component';
import { SeriesComponent } from './series/series.component';
import { SerieComponent } from './serie/serie.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { LanguagesComponent } from './languages/languages.component';
import { CategoriesComponent } from './categories/categories.component';
import { ActorsComponent } from './actors/actors.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    InterfaceComponent,
    ProfileComponent,
    SeriesComponent,
    SerieComponent,
    EpisodesComponent,
    CartComponent,
    AddressComponent,
    LanguagesComponent,
    CategoriesComponent,
    ActorsComponent,
    ProfilesComponent,
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [FilmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

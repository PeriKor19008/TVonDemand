import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilmsService } from './films.service';
import { HttpClientModule } from "@angular/common/http";
import { FilmsComponent } from './films/films.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FilmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

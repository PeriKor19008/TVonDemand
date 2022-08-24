import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilm, IFilmsCart, IUpdate } from './exports_for_services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http:HttpClient) { }
  getFilm(id:Number):Observable<IFilm>{
    return this.http.get<IFilm>("http://localhost:8090/film/"+id);
  }
  rentFilms(inventory_id:Number, customer_id:Number):Observable<IUpdate>{
    return this.http.get<IUpdate>("http://localhost:8090/film/rent/"+Number(inventory_id)+"/"+Number(customer_id));
  }
  getFilmsCart(id:Number):Observable<IFilmsCart>{
    return this.http.get<IFilmsCart>("http://localhost:8090/film/cart/"+id);
  }
  getFilmsOldRentals(id:Number):Observable<IFilmsCart>{
    return this.http.get<IFilmsCart>("http://localhost:8090/film/old_rentals/"+id);
  }
  payFilm(rental_id:Number):Observable<IUpdate>{
    return this.http.get<IUpdate>("http://localhost:8090/film/pay/"+rental_id);
  }
}

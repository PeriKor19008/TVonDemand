export interface IFilm{
  error:boolean,
  data:[Films]
}

export interface Film{
  film_id:number,
  title:string,
  description:string,
  release_year:number,
  language_id:number,
  original_language_id:number,
  length:number,
  rating:string,
  special_features:string,
  inventory_id:number
}

export interface IFilmsCart{
  error:boolean,
  data:[FilmsCart]
}

export interface FilmsCart{
  rental_id:number,
  title:string,
  paid:boolean,
  type:string,
  customer_id:number
}

export interface IUpdate{
  error:boolean,
  data:[Update]
}

export interface Update{
  fieldCount:number,
  affectedRows:number,
  insertId:number,
  serverStatus:number,
  warningCount:number,
  message:string,
  protocol41:boolean,
  changedRows:number
}

export interface IFilms{
  error:boolean,
  data:[Films]
}

export interface Films{
  film_id:number,
  title:string
}

export interface ISeries{
  error:boolean,
  data:[Series]
}

export interface Series{
  serie_id:number,
  title:string
}

export interface ISerie{
  error:boolean,
  data:[Serie]
}

export interface Serie{
  serie_id:number,
  title:string,
  description:string,
  release_year:number,
  language_id:number,
  original_language_id:number,
  rating:string,
  special_features:string,
  no_of_seasons:number
}

export interface ISeasons{
  error:boolean,
  data:[Seasons]
}

export interface Seasons{
  season_number:number,
  no_of_episodes:number,
  season_id:number,
  belongs_to:number
}

export interface IEpisodes{
  error:boolean,
  data:[Seasons]
}

export interface Episodes{
  episode_id:number,
  episode_number:number,
  inventory_id:number
}

export interface ISeriesCart{
  error:boolean,
  data:[SeriesCart]
}

export interface SeriesCart{
  rental_id:number,
  title:string,
  season_number:number,
  episode_number:number,
  paid:boolean,
  type:string,
  customer_id:number
}

export interface ILogin{
  data:[Login]
}

export interface Login{
  Found:boolean,
  Type:string,
  ID:number
}

export interface ICustomerProfile{
  data:[CustomerProfile]
}

export interface CustomerProfile{
  customer_id:number,
  first_name:string,
  last_name:string,
  email:string,
  address_id:number,
  active:boolean,
  create_date:string,
  view_type:string
}

export interface IEmployeeProfile{
  data:[EmployeeProfile]
}

export interface EmployeeProfile{
    employee_id:number,
    first_name:string,
    last_name:string,
    email:string,
    address_id:number,
    active:boolean,
    create_date:string
}

export interface IAdministratorProfile{
  data:[AdministratorProfile]
}

export interface AdministratorProfile{
  administrator_id:number,
  first_name:string,
  last_name:string,
  email:string,
  address_id:number,
  active:boolean,
  create_date:string
}

export interface IGetViewType{
  data:[GetViewType]
}

export interface GetViewType{
  view_type:string
}

export interface IAddress{
  data:[Address]
}

export interface Address{
  address_id:number,
  city_id:number,
  country_id:number,
  address:string,
  district:string,
  city:string,
  country:string,
  postal_code:number
}

export interface ILanuguage{
  error:boolean,
  data:[Language]
}

export interface Language{
  language_id:number,
  name:string
}

export interface ICategories{
  error:boolean,
  data:[Categories]
}

export interface Categories{
  category_id:number,
  name:string
}

export interface IActors{
  error:boolean,
  data:[Actors]
}

export interface Actors{
  actor_id:number,
  first_name:string,
  last_name:string
}

export interface ICustomers{
  error:boolean,
  data:[Customers]
}

export interface Customers{
  customer_id:number,
  first_name:string,
  last_name:string
}
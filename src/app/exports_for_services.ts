export interface IFilm{
  error:boolean,
  data:[Films],
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
  special_features:string
}

export interface IFilms{
  error:boolean,
  data:[Films],
}

export interface Films{
  film_id:number,
  title:string
}

export interface ISeries{
  error:boolean,
  data:[Series],
}

export interface Series{
  serie_id:number,
  title:string
}

export interface ISerie{
  error:boolean,
  data:[Serie],
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
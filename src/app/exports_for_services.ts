export interface IFilms{
  error:boolean,
  data:[Films],
  message:string
}

export interface Films{
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
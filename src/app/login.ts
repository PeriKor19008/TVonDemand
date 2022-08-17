export interface ILogin{
  error:boolean,
  data:[Login],
  message:string
}
export interface Login{
  Found:boolean,
  Type:string,
  ID:number
}

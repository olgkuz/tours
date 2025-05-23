export interface IOrder {
  
    tourId: string ,
    userId?: string ,
    orderPerson:IOrderPerson,
    _id?: string
}
export interface IOrderPerson {
    firstname:string,
    lastname:string,
    cardNumber:string,
    birthData:string;
    age:number
    citizenship:string;
}
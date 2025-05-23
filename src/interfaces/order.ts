import mongoose from "mongoose";

export interface IOrder {
  
    tourId: mongoose.Schema.Types.ObjectId,
    userId?: mongoose.Schema.Types.ObjectId,
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
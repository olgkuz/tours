import {IOrder} from "../interfaces/order";

export class OrderDto implements IOrder {
    age:string;
    birthDay: string;
    cardNumber: string;
    tourId: string;
    userId: string;


constructor (age: string,birthDay: string,cardNumber: string,tourId: string,userId: string){
    this.age = age;
    this.birthDay = birthDay;
    this.cardNumber=cardNumber;
    this.tourId=tourId;
    this.userId=userId;

}

 
    

}
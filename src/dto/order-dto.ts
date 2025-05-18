import { IsDateString, isDateString, IsInt, IsNotEmpty, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import {IOrder, IOrderPerson} from "../interfaces/order";
import { Type } from "class-transformer";

export class OrderPersonDto implements IOrderPerson {
    birthData: string;
    @IsInt()
    @Min(18)
    @Max(100)
    @IsNotEmpty()
    age:number;

    @IsNotEmpty()
    @IsDateString()
    birthDay: string;

    @IsNotEmpty()
    @IsString()
    @MinLength( 3)
    @MaxLength( 30)
    lastname: string;

    @IsNotEmpty()firstname: string;
    @IsNotEmpty()citizenship: string;

    @IsNotEmpty()
    @Matches(/^\d{12,14}$/)
    cardNumber: string;

}
export class OrderDto implements IOrder {
   
   
   
    @IsNotEmpty()tourId: string;
    @IsNotEmpty()userId: string;
    @ValidateNested()
    @Type( ()=> OrderPersonDto)
    orderPerson: IOrderPerson;
    


//constructor (age: string,birthDay: string,cardNumber: string,tourId: string,userId: string){
    //this.age = age;
    //this.birthDay = birthDay;
    //this.cardNumber=cardNumber;
    //this.tourId=tourId;
    //this.userId=userId;

//}

 
    

}
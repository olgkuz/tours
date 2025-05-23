import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IOrder, IOrderPerson } from 'src/interfaces/order';
import { TourDocument } from './tour';
import { UserDocument } from './user';
 
export type OrderDocument = HydratedDocument<Order>
 
@Schema()
export class Order {
   

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Tour'}) tourId: TourDocument;

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'User'}) userId: UserDocument;

    @Prop ({type:Object}) orderPerson: IOrderPerson;
   
 
      

 }   export const OrderSchema = SchemaFactory.createForClass(Order);
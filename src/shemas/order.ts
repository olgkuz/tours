import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true })
  tourId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: {
      firstname: String,
      lastname: String,
      cardNumber: String,
      birthData: String,
      age: Number,
      citizenship: String,
    },
    required: true
  })
  orderPerson: {
    firstname: string;
    lastname: string;
    cardNumber: string;
    birthData: string;
    age: number;
    citizenship: string;
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);


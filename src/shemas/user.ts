import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../interfaces/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ required: true })
  psw: string;

  @Prop()
  cardNumber: string;

  @Prop({ required: true, unique: true })
  login: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

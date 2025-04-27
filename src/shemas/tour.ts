import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {ITour} from "../interfaces/tour";
 
export type TourDocument = HydratedDocument<Tour>;
 
@Schema()
export class Tour implements ITour {
    @Prop() name: string;
 
    @Prop() description: string;
 
    @Prop() tourOperator: string
 
    @Prop() price: string
 
    @Prop() img: string;
 
    @Prop() id: string;
 
    @Prop() type: string
 
    @Prop() date: string
}
 
export const TourSchema = SchemaFactory.createForClass(Tour);
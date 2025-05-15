import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {  Order, OrderSchema} from "../../shemas/order"
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from 'src/services/order/order.service';


@Module({ 
  imports: [MongooseModule.forFeature([{ name: Order.name, schema:OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

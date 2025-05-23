import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {  Order, OrderSchema} from "../../shemas/order"
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from 'src/services/order/order.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users/users.service';
import { User, UserSchema } from 'src/shemas/user';
import { Tour, TourSchema } from 'src/shemas/tour';


@Module({ 
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema:OrderSchema },
    { name: User.name, schema:UserSchema },
    { name: Tour.name, schema:TourSchema }
  ])
],
  controllers: [OrderController],
  providers: [OrderService,JwtService,UsersService],
})
export class OrderModule {}

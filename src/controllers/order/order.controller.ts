import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';
import { use } from 'passport';
import { queue } from 'rxjs';
import { OrderDto } from 'src/dto/order-dto';
import { IOrder } from 'src/interfaces/order';
import { IUser } from 'src/interfaces/user';
import { ICustomOrderReturnType, OrderService } from 'src/services/order/order.service';
import { UsersService } from 'src/services/users/users.service';
import { Order } from 'src/shemas/order';
import { jwtConstant } from 'src/static/private/constants';

@Controller('order')
export class OrderController {
    constructor (private orderService : OrderService,private jwtService:JwtService, private userService: UsersService) {}

    @Post()
    initTours(@Body() data: OrderDto,@Req() request): Promise <boolean> {
        const authToken = this.userService.extractTokenFromHeader(request);
        const userPayload = <IUser>this.jwtService.verify(authToken,{secret:jwtConstant.secret});
        const orderData = {...data,userId:userPayload._id} as IOrder;

       //const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber,data.tourId, data.userId)
        this.orderService.sendOrder(orderData);
        return Promise.resolve(true);
    }
    @Get()
    getAllOrders(@Req()request,@Query()query): Promise<ICustomOrderReturnType> {
        const {from,to} = query;
        const authToken = this.userService.extractTokenFromHeader(request);
        const userPayload = <IUser>this.jwtService.verify(authToken,{secret:jwtConstant.secret});
        if (userPayload?.role === 'admin' ) {
           return this.orderService.getOrders(from, to); }
           else if ( userPayload?.role === 'user') {
            return this.orderService.getOrdersByUserId(userPayload._id, from, to)
           } else {throw new BadRequestException ( 'Роль пользователя не определена ')}
        }
        

    }
    


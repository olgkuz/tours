import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDto } from 'src/dto/order-dto';
import { OrderService } from 'src/services/order/order.service';
import { Order } from 'src/shemas/order';

@Controller('order')
export class OrderController {
    constructor (private orderService : OrderService) {}

    @Post()
    initTours(@Body() data: OrderDto): void {
       // const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber,data.tourId, data.userId)
        this.orderService.sendOrder(data);
    }
    @Get()
    getAllOrders(): Promise<Order[]>{
        return this.orderService.getOrders();
    }
    @Get('id')
    getOrdersFromUser(@Param('id')id):Promise<Order[]> {
        return this.orderService.getOrdersByUserId(id);
    }
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrderDto } from 'src/dto/order-dto';
import { IUser } from 'src/interfaces/user';
import {
  ICustomOrderReturnType,
  OrderService
} from 'src/services/order/order.service';
import { UsersService } from 'src/services/users/users.service';
import { jwtConstant } from 'src/static/private/constants';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  @Post()
async initTours(@Body() data: OrderDto, @Req() request): Promise<boolean> {
  const authToken = this.userService.extractTokenFromHeader(request);
  if (!authToken) {
    throw new BadRequestException('Токен авторизации не найден');
  }

  const userPayload = this.jwtService.verify(authToken, {
    secret: jwtConstant.secret
  }) as IUser;

  if (!userPayload?._id) {
    throw new BadRequestException('Не удалось определить пользователя');
  }

  const orderData = {
    ...data,
    userId: String(userPayload._id)
  };

  await this.orderService.sendOrder(orderData);
  return true;
}

@Get()
async getAllOrders(
  @Req() request,
  @Query() query
): Promise<ICustomOrderReturnType> {
  const { from, to } = query;
  const authToken = this.userService.extractTokenFromHeader(request);
  if (!authToken) {
    throw new BadRequestException('Токен авторизации не найден');
  }

  const userPayload = this.jwtService.verify(authToken, {
    secret: jwtConstant.secret
  }) as IUser;

  if (!userPayload?.role) {
    throw new BadRequestException('Роль пользователя не определена');
  }

  if (userPayload.role === 'admin') {
    return this.orderService.getOrders(from, to);
  }

  if (userPayload.role === 'user') {
    if (!userPayload._id) {
      throw new BadRequestException('Идентификатор пользователя не найден');
    }
    return this.orderService.getOrdersByUserId(String(userPayload._id), from, to);
  }

  throw new BadRequestException('Недопустимая роль пользователя');
}

}

    


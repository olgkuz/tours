import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/dto/order-dto';
import { IOrderPerson } from 'src/interfaces/order';
import { Order, OrderDocument } from 'src/shemas/order';
import { TourDocument } from 'src/shemas/tour';
import { UserDocument } from 'src/shemas/user';

export interface ICustomOrder {
  orderPerson: IOrderPerson;
  user: { login: string; id: string };
  tour: TourDocument;
}

export interface ICustomOrderReturnType {
  data: ICustomOrder[];
  count: number;
}

// Расширяем тип Order после populate
type PopulatedOrder = Omit<Order, 'userId' | 'tourId'> & {
  userId: UserDocument;
  tourId: TourDocument;
};

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Tour') private tourModel: Model<TourDocument>
  ) {}

  async sendOrder(data: OrderDto): Promise<Order> {
    const orderData = new this.orderModel(data);
    return orderData.save();
  }

  async getOrders(from: number, to: number): Promise<ICustomOrderReturnType> {
    const orders = await this.orderModel
      .find()
      .skip(from)
      .limit(to)
      .populate('userId', ['login', '_id'])
      .populate('tourId')
      .exec();

    const data: ICustomOrder[] = (orders as unknown as PopulatedOrder[]).map(order => ({
      orderPerson: order.orderPerson,
      user: {
        login: order.userId.login,
        id: order.userId._id.toString(),
      },
      tour: order.tourId,
    }));

    const count = await this.orderModel.countDocuments();

    return { data, count };
  }

  async getOrdersByUserId(
    id: string,
    from: number,
    to: number
  ): Promise<ICustomOrderReturnType> {
    const orders = await this.orderModel
      .find({ userId: id })
      .skip(from)
      .limit(to)
      .populate('userId', ['login', '_id'])
      .populate('tourId')
      .exec();

    const data: ICustomOrder[] = (orders as unknown as PopulatedOrder[]).map(order => ({
      orderPerson: order.orderPerson,
      user: {
        login: order.userId.login,
        id: order.userId._id.toString(),
      },
      tour: order.tourId,
    }));

    const count = await this.orderModel.countDocuments({ userId: id });

    return { data, count };
  }
}

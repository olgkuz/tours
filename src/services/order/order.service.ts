import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { use } from 'passport';
import { OrderDto, OrderPersonDto } from 'src/dto/order-dto';
import { IOrderPerson } from 'src/interfaces/order';
import { Order, OrderDocument} from 'src/shemas/order';
import { TourDocument } from 'src/shemas/tour';
import { UserDocument } from 'src/shemas/user';
export interface ICustomOrder {
    orderPerson:IOrderPerson
    user:{login:string, id: mongoose.Types.ObjectId},
    tour:TourDocument
}
export interface ICustomOrderReturnType {
    data: ICustomOrder [],
    count:number
}

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name)private orderModel:Model<OrderDocument>){}

    async sendOrder(data:OrderDto) : Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save();
    }
    async getOrders(from,to): Promise<ICustomOrderReturnType>{
        return this.orderModel.find<OrderDocument>().limit(to).skip(from).then((order)=>{
            return this.getOrdersWithUser(order);
        });

    }
    async getOrdersByUserId(id:string,from:number,to:number): Promise<ICustomOrderReturnType>{
        const orders = await this.orderModel.find<OrderDocument>().exec();
        const orderCount = orders.filter((order)=>order.userId._id.equals(id)).length;
        const orderData: ICustomOrder[]=[]
        return this.orderModel.find<OrderDocument>().limit(to).skip(from)
        .populate({path:'userId',select:['login','_id']})
        .populate({path:'tourId'}).then((data)=> {
            data.filter((order)=>{
                const userScore = order.userId;
                return userScore._id.equals(id);
            }).forEach((order)=>{
                const userScore = order.userId;
                const tourScore = order.tourId;
                const newOrderInfo = {
                    orderPerson:order.orderPerson,
                    user:{ login:userScore.login,id:userScore._id},
                    tour:tourScore,
                } as ICustomOrder
                orderData.push(newOrderInfo)
            });
            return{data:orderData,count:orderCount} as ICustomOrderReturnType;
        }
    }
    async getOrdersWithUser(orders:OrderDocument[]): Promise <ICustomOrderReturnType> {
        let userData: ICustomOrder []=[];
        const orderCount = await this.orderModel.countDocuments().exec();

        await Promise.all(orderCount.map(async order => {
            const userInfo = await this.userModel.findById<UserDocument>(order.userId).exec();
            const tourInfo = await this.tourModel.findById<TourDocument>(order.tourId).exec();
            if (userInfo) {
                const newOrderInfo = {
                    orderPerson: order.orderPerson,
                    user:{login:userInfo.login,id:userInfo._id},
                    tour:tourInfo,
                } as ICustomOrder;
                userData.push(newOrderInfo)
            
        } 
            return {data:userData,count: orderCount} as ICustomOrderReturnType;
    }
}

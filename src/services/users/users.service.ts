import {Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../../shemas/user";
import {UserDto} from "../../dto/user-dto";
 
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        console.log('userService run')
    }
 
 
    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
 
    async getUserById(id): Promise<User> {
        return this.userModel.findById(id);
    }
 
    async sendUser(data): Promise<User> {
        const userData = new this.userModel(data);
        return userData.save();
    }
 
    async updateUsers(id: string, body): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, body);
    }
 
    async deleteUsers(): Promise<User> {
        return this.userModel.remove()
    }
 
    async  deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id);
    }
 
    async checkAuthUser(login: string, psw: string): Promise<User[]> {
        return this.userModel.find({login: login, psw: psw});
    }
 
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }
 
 
}
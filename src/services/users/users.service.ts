import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { User, UserDocument } from 'src/shemas/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    console.log('userService run')
  }

      async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
      }
     
      async getUserById(id:string ): Promise<User | null> {
       
        return this.userModel.findById(id);
      }
      
      async sendUser( data ) : Promise<User> {
        const userData = new this.userModel(data);
        return userData.save();
      }
     
      async updateUsers(id:string): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id);
      }
      
      async deleteUsers(): Promise<DeleteResult> {
        return this.userModel.deleteMany({});
      }
      async deleteUserById(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id);
      }
      
}
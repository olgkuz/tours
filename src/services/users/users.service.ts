import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, DeleteResult } from 'mongoose';
import { User, UserDocument } from '../../shemas/user';
import { UserDto } from '../../dto/user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    console.log('userService run');
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async sendUser(data: UserDto): Promise<{ id: string; access_token: string }> {
    const userData = new this.userModel(data);
    const savedUser = await userData.save();

    const payload = { login: savedUser.login, psw: savedUser.psw };
    const access_token = this.jwtService.sign(payload);

    return {
      id: savedUser._id.toString(),
      access_token,
    };
  }

  async updateUsers(id: string, body: any): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, body, { new: true });
  }

  async deleteUsers(): Promise<DeleteResult> {
    return this.userModel.deleteMany();
  }

  async deleteUserById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }

  async checkAuthUser(login: string, psw: string): Promise<User[] | null> {
    const usersArr = await this.userModel.find({ login, psw });
    return usersArr.length === 0 ? null : usersArr;
  }

 async checkRegUser(login: string): Promise<User[]> {
  const existing = await this.userModel.find({ login });
  console.log('🔍 Проверка login:', login, '— найдено:', existing.length);
  return existing;
}


  async login(user: UserDto) {
    const payload = { login: user.login, psw: user.psw };
    const userFromDb = await this.userModel.find({ login: user.login });

    if (!userFromDb.length) {
      throw new Error('Пользователь не найден');
    }

    return {
      id: userFromDb[0]._id,
      access_token: this.jwtService.sign(payload),
    };
  }
}


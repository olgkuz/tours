import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, DeleteResult, Promise } from 'mongoose';
import { User, UserDocument } from '../../shemas/user';
import { UserDto } from '../../dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import { IResponseUser, IUser } from 'src/interfaces/user';
import * as bcrypt from 'bcrypt'
import { resolve } from 'path';
import { IRoute } from 'express';

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

  async registerUser(user: UserDto): Promise<boolean> {
    const defaultRole = 'user';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.psw, salt);
    console.log('hashedPassword', hashedPassword)

    const newUser:IUser = {...user, psw:hashedPassword,role:defaultRole}
    const userData =new this.userModel(newUser);
     userData.save()
     return Promise.resolve(true)
  }

  async updateUsers(id: string, user: IUser): Promise<User | null> {
    const salt = await bcrypt.genSalt();
    const hashedPsw = await bcrypt.hash(user.psw, salt);
    const hashUser = Object.assign({},user,{psw:hashedPsw})

    return this.userModel.findByIdAndUpdate(id, hashUser);
  }

  async deleteUsers(): Promise<DeleteResult> {
    return this.userModel.deleteMany();
  }

  async deleteUserById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }

  async checkAuthUser(login: string, psw: string): Promise<User[] | null> {
    const usersArr =<IUser[]> await this.userModel.find<IUser>({ login });
    if (usersArr.length === 0){
      throw new BadRequestException('Логин указан неверно');}
      const isMatch: boolean = bcrypt.compareSync(psw, usersArr[0].psw)
      if(!isMatch) {
        throw new BadRequestException( 'Пароль указан неверно')
      }


    return Promise.resolve(usersArr);
  }
  async getUserByLogin(login:string):Promise<IUser| null> {
    return this.userModel.findOne({login});
  }

 async checkRegUser(login: string): Promise<User[]> {
  
 
  return this.userModel.find({ login });
}


  async login(user: UserDto) {
    
    const userFromDb =<IUser> await this.userModel.findOne({ login: user.login });
    const payload = { login: user.login, psw: user.psw, role:userFromDb?.role,_id:userFromDb?._id };

    return {
      id: userFromDb._id,
      access_token: this.jwtService.sign(payload),
      role:userFromDb.role
    } as IResponseUser;
  }

  extractTokenFromHeader(request:Request): string | undefined {
    const [type, token] = request.headers.authorization?.split('')??[];
    return type ==== 'Bearer' ? token : undefined;
  }
}


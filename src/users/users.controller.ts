import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'mongoose';
import { UsersService } from 'src/services/users/users.service';
import { User } from 'src/shemas/user';

@Controller('users')
export class UsersController {
     constructor (private userService: UsersService){

     }
     @Get()
      getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
      }
      @Get(":id")
      getUserById(@Param('id') id:string): Promise<User | null> {
        return this.userService.getUserById(id);
      }
      @Post()
      sendUser(@Body()data): Promise<User > {
        return this.userService.sendUser(data);
      }
      @Put(":id")
      updateUsers(@Param('id')id): Promise<User | null> {
        return this.userService.updateUsers(id);
      }
      @Delete()
      deleteUsers(): Promise<DeleteResult> {
      return this.userService.deleteUsers();
}
      @Delete(":id")
      deleteUserById(@Param('id') id): Promise<User |null>{
        return this.userService.deleteUserById(id);
      }
      
}

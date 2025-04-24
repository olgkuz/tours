import {  Injectable, Param } from '@nestjs/common';

@Injectable()
export class UsersService {

      getAllUsers(): string {
        return "get service all users ";
      }
     
      getUserById(id:string): string {
        return "service  user id is " + id;
      }
      
      sendUsers(): string {
        return "service  user post data"
      }
     
      updateUsers(): string {
        return " service user put data"
      }
      
      deleteUsers(): string {
        return " service user delete data"
      }
      
      deleteUserById(id:string): string {
        return " service user delete is " + id;
      }
}
import {
  Body, Controller, Delete, Get, HttpException, HttpStatus,
  Param, Post, Put,
  UseGuards
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../shemas/user';
import { UserDto } from '../../dto/user-dto';
import { DeleteResult } from 'mongoose';
import { UserAuthPipe } from 'src/pipes/user-auth.pipe';
import { IUser } from 'src/interfaces/user';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Post()
  registerUser(@Body(UserAuthPipe) data: UserDto): Promise<boolean> {
    return this.userService.checkRegUser(data.login).then((queryRes) => {
      if (queryRes.length === 0) {
        return this.userService.registerUser(data);
      } else {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          errorText: 'Пользователь уже зарегистрирован',
        }, HttpStatus.CONFLICT);
      }
    });
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  authUser(@Body(UserAuthPipe) data: UserDto): any {
    return this.userService.login(data);
  }

  @Put(':id')
  updateUsers(@Param('id') id: string, @Body() data: any): Promise<User | null> {
    return this.userService.updateUsers(id, data);
  }

  @Delete()
  deleteUsers(): Promise<DeleteResult> {
    return this.userService.deleteUsers();
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.deleteUserById(id);
  }
}

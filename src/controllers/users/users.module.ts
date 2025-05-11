import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shemas/user';
import { AuthService } from 'src/services/authentication/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { jwtConstant } from 'src/static/private/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/authentication/jwt-strategy/jwt-strategy.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
            PassportModule,
            JwtModule.register({
              secret: jwtConstant.secret,
              
            })],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtStrategyService],
})
export class UsersModule {}

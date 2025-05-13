


import { PassportModule } from '@nestjs/passport';
import { jwtConstant } from 'src/static/private/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/authentication/jwt-strategy/jwt-strategy.service';
import { ToursController } from './tours.controller';
import { Tour, TourSchema } from 'src/shemas/tour';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ToursService } from 'src/services/tours/tours.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
            PassportModule,
            JwtModule.register({
              secret: jwtConstant.secret,
              
            })],
  controllers: [ToursController],
  providers: [ToursService,JwtStrategyService],
})
export class ToursModule {}
import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ITour, ITourClient } from 'src/interfaces/tour';
import { ToursService } from 'src/services/tours/tours.service';
import {diskStorage} from "multer"
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('tour-iteam')
export class TourIteamController {
    constructor(private tourService:ToursService){}

    static imgName: string;
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('img', {

        storage: diskStorage( {
            destination: './public/',
            filename:( req, file, cb)=>{
                const imgType = file.mimetype.split('/')
                const uniqueSuffix = Date.now()+'-'+ Math.round( Math.random() * 1E9);
                const imgName = file.fieldname + '-'+ uniqueSuffix + '.'+ imgType[1]

                cb( null,imgName);
                TourIteamController.imgName = imgName;
            }
        })

    })
    )
    initTours(@Body() body: ITourClient): void {
        body.img = TourIteamController.imgName;
        this.tourService.uploadTour(body);
    }
}
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
    constructor(private toursService:ToursService){}

@UseGuards(JwtAuthGuard)
@Get()
getAllTours(): void{
    this.toursService.generateTours();
    
}
@Get(":remove")
removeAllTours(@Param('remove')remove): void {
    console.log('re')
    this.toursService.deleteTours();
}

}
import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ITour } from 'src/interfaces/tour';
import { ValidationParamIdPipe } from 'src/pipes/param-id.pipe';
import { JwtAuthGuard } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  

  @Post()
  initTours(): void {
      this.toursService.generateTours();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTourById(@Param('id',ValidationParamIdPipe) id: string): Promise<ITour | null> {
    return this.toursService.getTourById(id);
  }

  @Delete()
   removeAllTours(): void {
   this.toursService.deleteTours();
  }

  @Delete(':id')
  deleteTourById(@Param('id') id: string): Promise<ITour | null> {
    return this.toursService.deleteTourById(id);
  }
}

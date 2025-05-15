import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ITour } from 'src/interfaces/tour';
import { JwtAuthGuard } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  // Генерация тестовых туров и возвращение всех туров
  @Post()
  async initTours(): Promise<ITour[]> {
    await this.toursService.generateTours();
    return this.toursService.getAllTours();
  }

  // Получить все туры
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTours(): Promise<ITour[]> {
    return this.toursService.getAllTours();
  }

  // Получить тур по ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTourById(@Param('id') id: string): Promise<ITour | null> {
    return this.toursService.getTourById(id);
  }

  // Удалить все туры
  @Delete()
  async removeAllTours(): Promise<{ deletedCount: number }> {
    return this.toursService.deleteTours();
  }

  // Удалить тур по ID
  @Delete(':id')
  deleteTourById(@Param('id') id: string): Promise<ITour | null> {
    return this.toursService.deleteTourById(id);
  }
}

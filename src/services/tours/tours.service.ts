import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, DeleteResult } from 'mongoose';
import { Tour, TourDocument } from 'src/shemas/tour';
import { TourDto } from 'src/dto/tour-dto';
import { ITour, ITourClient } from 'src/interfaces/tour';

@Injectable()
export class ToursService {
  private toursCount = 10;

  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>
  ) {}

  async generateTours(): Promise<ITour[]> {
    const createdTours: ITour[] = [];
    for (let i = 0; i <= this.toursCount; i++) {
      const tour = new TourDto(
        'test tour ' + i,
        'tour description',
        'tour operator',
        '300' + i,
        'img'
      );
      const tourData = new this.tourModel(tour);
      await tourData.save();
      createdTours.push(tourData);
    }
    return createdTours;
  }

 

  async getTourById(id: string): Promise<ITour | null> {
    return this.tourModel.findById(id);
  }
  async getAllTours(): Promise<ITour[]> {
  return this.tourModel.find();
  }
  async uploadTour(body:ITourClient){
    const tour = new TourDto (body.name, body.description, body.tourOperator,body.price,body.img)
    const tourData = new this.tourModel(tour);
    await tourData.save();
  }

  async deleteTours(): Promise<DeleteResult> {
    return this.tourModel.deleteMany();
  }

  async deleteTourById(id: string): Promise<ITour | null> {
    return this.tourModel.findByIdAndDelete(id);
  }
}


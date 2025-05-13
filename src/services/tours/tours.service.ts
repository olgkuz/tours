import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from 'src/shemas/tour';
import { TourDto } from 'src/dto/tour-dto';

@Injectable()
export class ToursService {
  private toursCount = 10;

  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>
  ) {}

  generateTours(): void {
    for (let i = 0; i <= this.toursCount; i++) {
      const tourDto = new TourDto(
          'test tour' + i,
          'tour description',
          'tour operator',
          '300' + i
    );
      const tourData = new this.tourModel(tourDto);
      tourData.save();
    }
  }

  async deleteTours(): Promise<any> {
    this.tourModel.deleteMany({})
  }
}



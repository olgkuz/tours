import {
  IsInt,
  IsNotEmpty,
  IsDateString,
  IsString,
  Matches,
  Max,
  Min,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderPersonDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastname: string;

  @IsNotEmpty()
  @Matches(/^\d{12,14}$/)
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  citizenship: string;

  @IsNotEmpty()
  @IsDateString()
  birthData: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;
}

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  tourId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OrderPersonDto)
  orderPerson: OrderPersonDto;
}

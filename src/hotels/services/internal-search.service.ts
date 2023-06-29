import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Hotel, HotelDocument } from '../schemas/hotels.schema';
import { CreateInternalHotelDto } from '../dto/create-internal-hotel.dto';

type QueryFilter<T> = {
  [K in keyof T]?: { $regex: RegExp };
};

@Injectable()
export class InternalSearchService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>,
  ) {}

  async create(createInternalHoteltDto: CreateInternalHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createInternalHoteltDto);
    return createdHotel.save();
  }

  async findAll(name: string, address?: string): Promise<Hotel[]> {

    const query: QueryFilter<Hotel> =  { name: { $regex: new RegExp(name, 'i') } };

    if (address) {
      query.address = { $regex: new RegExp(address, 'i') };
    }

    return this.hotelModel.find(query).populate('images').exec();
  }
}
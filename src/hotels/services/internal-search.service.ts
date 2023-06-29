import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Hotel, HotelDocument } from '../schemas/hotels.schema';
import { CreateInternalHotelDto } from '../dto/create-internal-hotel.dto';

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

  async findAll(name: string, address: string): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
}
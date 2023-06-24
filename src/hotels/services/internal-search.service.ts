import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Hotel, HotelDocument } from '../schemas/hotels.schema';
import { CreateHotelDto } from '../dto/create-hotel.dto';

@Injectable()
export class InternalSearchService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>,
  ) {}

  // Run seed for local data ?
  async onModuleInit() {
    try {
        const newHotel = {
          name: 'yourname'
        };
        const hotel = await this.hotelModel.create(newHotel); // this method creates new user in database
        console.log(hotel);
    } catch (error) {
      throw error;
    }
  }

  async create(createHoteltDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHoteltDto);
    return createdHotel.save();
  }

  async findAll(name: string, address: string): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
}
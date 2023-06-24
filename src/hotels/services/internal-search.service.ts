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

  async onModuleInit() {
    try {
        // If run locally, seed db
        if (!process.env.ENV) {
          // const newHotel = {
          //   name: 'asd'
          // };
          // await this.hotelModel.create(newHotel); // this method creates new user in database          
          // const hotels = await this.hotelModel.find().exec();
          console.log('hotels!: ');
        }
    } catch (error) {
      throw error;
    }
  }

  async create(createInternalHoteltDto: CreateInternalHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createInternalHoteltDto);
    return createdHotel.save();
  }

  async findAll(name: string, address: string): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
}
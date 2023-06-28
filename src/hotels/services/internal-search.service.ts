import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Hotel, HotelDocument } from '../schemas/hotels.schema';
import { CreateInternalHotelDto } from '../dto/create-internal-hotel.dto';
import { loadHotels } from '../seeds/database.seed';

@Injectable()
export class InternalSearchService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>,
  ) {}

  // async onModuleInit() {
  //   try {
  //       // If run locally, seed db
  //       if (!process.env.ENV) {
  //         const hotels = loadHotels();
  //         const [ oneHotel ] = hotels;
  //         console.log('one hotel: ', oneHotel);
  //         await this.create(oneHotel);
  //         // const createHotelsPromises = hotels.map(h => this.hotelModel.create(h));
  //         // await Promise.all(createHotelsPromises);

  //       }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async create(createInternalHoteltDto: CreateInternalHotelDto): Promise<Hotel> {
    console.log('create: ', createInternalHoteltDto);
    const createdHotel = new this.hotelModel(createInternalHoteltDto);
    return createdHotel.save();
  }

  async findAll(name: string, address: string): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
}
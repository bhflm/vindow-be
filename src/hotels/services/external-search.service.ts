import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Hotel, HotelDocument } from '../schemas/hotels.schema';

/**
 * 
 * @@TODO: Wrapper on top of the Google Places API 
 */

@Injectable()
export class ExternalSearchService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>,
  ) {}

  async search(hotelName: string, address: string) {
    throw Error('Not implemented yet');
  }
}
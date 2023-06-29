import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { InternalHotel } from '../interfaces/hotels.interface'; // @@ todo: correct return output ?? 
import { Hotel, HotelDocument } from '../schemas/hotels.schema';
import { serializeFindAllResponse } from '../serializer/internal-search.serializer';

type QueryFilter<T> = {
  [K in keyof T]?: { $regex: RegExp };
};

@Injectable()
export class InternalSearchService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<Hotel>,
  ) {}

  async findAll(name: string, address?: string): Promise<InternalHotel[]> {

    const query: QueryFilter<Hotel> =  { name: { $regex: new RegExp(name, 'i') } };

    if (address) {
      query.address = { $regex: new RegExp(address, 'i') };
    }

    const hotelDocuments: HotelDocument[] = await this.hotelModel.find(query).populate('images').exec();
    const serializedResponse = serializeFindAllResponse(hotelDocuments);

    return serializedResponse;
  }
}
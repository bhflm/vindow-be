import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel, HotelDocument } from './schemas/hotels.schema';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>,
  ) {}

  async create(createHoteltDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(CreateHotelDto);
    return createdHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }
}


// @Injectable()
// export class UrlService {

//     constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {
//     }

//     private shrink(url: string) {
//         return CRC.str(url).toString(16)
//     }

//     async create(url: string) {
//         const createdUrl = new this.urlModel({url: url, shortenedUrl: this.shrink(url)});
//         await createdUrl.save();
//         return basepath + "s/" + createdUrl.shortenedUrl;
//     }

//     async find(shortenedUrl: string) { //-3c666ac
//         const url = await this.urlModel.findOne({shortenedUrl: shortenedUrl}).exec();
//         return url.url;
//     }
// }
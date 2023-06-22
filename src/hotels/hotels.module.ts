import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel, HotelSchema } from './schemas/hotels.schema';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{name: Hotel.name, schema: HotelSchema}])],
  controllers: [HotelsController],
  providers: [
    HotelsService,
  ]
})

export class HotelsModule {}

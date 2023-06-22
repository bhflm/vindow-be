import { Controller, Get, Post, Body } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('/hotel')
  create(@Body() createHotelDto: CreateHotelDto) {
    console.log('CREATE HOTEL');
    return this.hotelsService.create(createHotelDto);
  }

  @Get('/hotels')
  findAll() {
    console.log('hotels!!');
    return this.hotelsService.findAll();
  }
}

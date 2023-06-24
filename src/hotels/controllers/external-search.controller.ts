import { Controller, Get, Query } from '@nestjs/common';
import { ExternalSearchService } from '../services/external-search.service';

@Controller('external-search')
export class ExternalSearchController {
  constructor(private readonly externalSearchService: ExternalSearchService) {}

  @Get()
  search(@Query('hotelName') hotelName: string, @Query('address') address: string) {
    // Delegate the request to the ExternalSearchService
    return this.externalSearchService.search(hotelName, address);
  }
}
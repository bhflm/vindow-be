import { Controller, Get, Query } from '@nestjs/common';
import { InternalSearchService } from '../services/internal-search.service';

@Controller('external-search')
export class InternalSearchController {
  constructor(private readonly internalSearchService: InternalSearchService) {}

  @Get()
  search(@Query('hotelName') hotelName: string, @Query('address') address: string) {
    // Delegate the request to the ExternalSearchService
    return this.internalSearchService.findAll(hotelName, address);
  }
}
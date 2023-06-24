import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ExternalSearchService } from '../services/external-search.service';

@Controller('hotels')
export class ExternalSearchController {
  constructor(private readonly externalSearchService: ExternalSearchService) {}

  @Get('/external-search')
  @ApiOperation({ summary: 'Gets external search data from Hotels, returning a list of hotels'})
  @ApiQuery({ name: 'address', required: false, description: 'Hotel Address' })
  @ApiResponse({ status: 200, description: 'Hotels list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  search(@Query('hotelName') hotelName: string, @Query('address') address?: string) {
    // Delegate the request to the ExternalSearchService
    console.log('hotels external search!');
    return this.externalSearchService.search(hotelName, address);
  }
}
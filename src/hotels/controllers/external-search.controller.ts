import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ExternalSearchService } from '../services/external-search.service';

@Controller('hotels/external-search')
export class ExternalSearchController {
  constructor(private readonly externalSearchService: ExternalSearchService) {}

  @Get(':hotel')
  @ApiOperation({ summary: 'Gets external search data from Hotels, returning a list of hotels'})
  @ApiParam({ name: 'name', required: false, description: 'Hotel name' })
  @ApiQuery({ name: 'address', required: false, description: 'Hotel address' })
  @ApiResponse({ status: 200, description: 'Hotels list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async search(@Param('hotel') hotel: string, @Query('address') address?: string) {
    try {
      let hotelsDataResponse;
      if (address) {
        hotelsDataResponse = await this.externalSearchService.searchHotels(hotel, address);
      } else {
        hotelsDataResponse = await this.externalSearchService.searchHotels(hotel);
      }
      return hotelsDataResponse;
    } catch(err) {
      throw new Error(err);
    }
  }
}
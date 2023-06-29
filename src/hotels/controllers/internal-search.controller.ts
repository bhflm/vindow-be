import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { InternalSearchService } from '../services/internal-search.service';

@Controller('hotels')
export class InternalSearchController {
  constructor(private readonly internalSearchService: InternalSearchService) {}

  
  @Get('/internal-search/:name')
  @ApiOperation({ summary: 'Gets data from Hotels, returning a list of internal hotels data'})
  @ApiParam({ name: 'name', required: false, description: 'Hotel name' })
  @ApiQuery({ name: 'address', required: false, description: 'Hotel address' })
  @ApiResponse({ status: 200, description: 'Hotels list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  
  search(@Param('name') name: string, @Query('address') address?: string) {
    return this.internalSearchService.findAll(name, address);
  }
}
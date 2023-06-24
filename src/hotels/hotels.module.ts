import { MiddlewareConsumer,  Module, NestModule } from '@nestjs/common';
import { ValidateAPIKey } from 'src/middlewares/validate-api-key.middleware';
import { ExternalSearchController } from './controllers/external-search.controller';
import { InternalSearchController } from './controllers/internal-search.controller';
import { ExternalSearchService } from './services/external-search.service';
import { InternalSearchService } from './services/internal-search.service';

import { Hotel, HotelSchema } from './schemas/hotels.schema';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{name: Hotel.name, schema: HotelSchema}])],
  controllers: [ExternalSearchController, InternalSearchController],
  providers: [
    ExternalSearchService, InternalSearchService
  ]
})

export class HotelsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateAPIKey).forRoutes('*');
  }
}
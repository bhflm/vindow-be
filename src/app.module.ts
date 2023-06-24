
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from './hotels/hotels.module';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    HotelsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

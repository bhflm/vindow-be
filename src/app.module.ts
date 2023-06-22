
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsModule } from './hotels/hotels.module';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/';

console.log('MONGO URL: ', MONGODB_URL);

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    HotelsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

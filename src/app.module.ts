import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from './hotels/hotels.module';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';

// Load env
ConfigModule.forRoot();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    HotelsModule,
    LoggerModule
  ],
  controllers: [],
  providers: [RequestLoggerMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

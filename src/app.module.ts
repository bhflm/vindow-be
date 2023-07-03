import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { HotelsModule } from './hotels/hotels.module';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { globalCfg } from '../config/index';

// Load env
ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(globalCfg.db.MONGODB_URL),
    HotelsModule,
    LoggerModule,
    HealthModule
  ],
  controllers: [],
  providers: [RequestLoggerMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

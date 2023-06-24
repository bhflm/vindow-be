import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';

const PORT = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupSwagger(app);

  await app.listen(PORT);
  console.log(`🚀 Server running on port: ${PORT}`)
}

bootstrap();

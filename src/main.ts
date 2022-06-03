import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv = require('dotenv');

async function bootstrap() {
  // dotenv.config();
  const app = await NestFactory.create(AppModule);
  // const config = app.get(dotenv.config);
  await app.listen(5051);
  // await app.listen(config.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  const corsOptions: CorsOptions = {
    origin: 'http://localhost',
  };
  app.enableCors(corsOptions);

  await app.listen(port || 3001, () => {
    console.log(`App started on port: ${port}`)
  });
}

bootstrap();

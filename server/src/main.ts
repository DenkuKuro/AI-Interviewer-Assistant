import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { TransformInterceptor } from './utils/transform/transform.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
  })
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();

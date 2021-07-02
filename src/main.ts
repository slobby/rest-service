import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { IEnvironmentVariables } from './interfaces/IEnvironmentVariables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = app
    .get<ConfigService<IEnvironmentVariables>>(ConfigService)
    .get<number>('PORT', 4000);
  await app.listen(port, () =>
    process.stdout.write(`Listening on port ${port}`),
  );
}
bootstrap();

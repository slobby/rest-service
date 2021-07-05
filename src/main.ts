import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IEnvironmentVariables } from './common/interfaces/IEnvironmentVariables';
import { addAdmin } from './database/addAdmin';
import { UsersService } from './models/users/users.service';
import { AuthGuard } from './common/guards/auth.guard';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(app.get(AuthGuard));

  app.useGlobalFilters(new AllExceptionFilter());

  const configService =
    app.get<ConfigService<IEnvironmentVariables>>(ConfigService);

  const usersService = app.get(UsersService);

  const port = configService.get<number>('PORT', 4000);

  addAdmin(usersService, configService);

  await app.listen(port, () =>
    process.stdout.write(`Listening on port ${port}`),
  );
}
bootstrap();

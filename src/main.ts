import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { IEnvironmentVariables } from './common/interfaces/IEnvironmentVariables';
import { addAdmin } from './database/addAdmin';
import { UsersService } from './models/users/users.service';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService =
    app.get<ConfigService<IEnvironmentVariables>>(ConfigService);

  const usersService = app.get(UsersService);

  const port = configService.get<number>('PORT', 4000);

  app.useGlobalGuards(new AuthGuard(usersService, configService));

  addAdmin(usersService, configService);

  await app.listen(port, () =>
    process.stdout.write(`Listening on port ${port}`),
  );
}
bootstrap();

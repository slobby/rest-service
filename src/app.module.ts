import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './models/users/users.module';
import { BoardsModule } from './models/boards/boards.module';
import { TasksModule } from './models/tasks/tasks.module';
import { LoginModule } from './models/login/login.module';
import { AuthModule } from './common/guards/auth.module';
import { FilterModule } from './common/filters/filters.module';
import { LoggerModule } from './common/logger/logger.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          retryAttempts: 5,
          retryDelay: 2000,
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
    LoggerModule,
    AuthModule,
    FilterModule,
    InterceptorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

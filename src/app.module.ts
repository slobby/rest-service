import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './models/users/users.module';
import { BoardsModule } from './models/boards/boards.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

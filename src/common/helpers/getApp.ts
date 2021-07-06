import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '../../app.module';
import { USE_FASTIFY } from '../config/config';

export const getApp = async (): Promise<INestApplication> => {
  if (USE_FASTIFY) {
    process.stdout.write('Use fastify.\n');
    return NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  }
  process.stdout.write('Use express.\n');
  return NestFactory.create(AppModule);
};

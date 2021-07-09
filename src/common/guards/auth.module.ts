import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UsersModule } from '../../models/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}

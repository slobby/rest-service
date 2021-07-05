import { Module } from '@nestjs/common';
import { AllExceptionFilter } from './all-exception.filter';
// import { UsersModule } from '../../models/users/users.module';

@Module({
  // imports: [UsersModule],
  providers: [AllExceptionFilter],
  exports: [AllExceptionFilter],
})
export class FilterModule {}

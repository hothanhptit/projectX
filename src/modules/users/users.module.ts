import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersResolver, UsersService],
  // imports: [
  //   TypeOrmModule.forFeature([]),
  // ],
  exports: [UsersService],
})
export class UsersModule {}

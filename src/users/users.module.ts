import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports:[ TypeOrmModule ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities';
import { Conversation, Message } from 'src/chat/entities';

@Module({
  imports:[ TypeOrmModule.forFeature([User]) ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {}

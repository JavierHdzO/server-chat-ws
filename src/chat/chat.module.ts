import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { Conversation, Message } from './entities';
@Module({
  imports:[TypeOrmModule.forFeature([Conversation, Message]), UsersModule],
  providers: [ChatGateway, ChatService],
  exports:[TypeOrmModule]
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './services/conversation.service';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { Conversation, Message } from './entities';
import { ChatService } from './services/chat.service';
import { AuthModule } from 'src/auth/auth.module';;
@Module({
  imports:[TypeOrmModule.forFeature([Conversation, Message]), UsersModule, AuthModule],
  providers: [ChatGateway, ChatService, ConversationService],
  exports:[TypeOrmModule]
})
export class ChatModule {}

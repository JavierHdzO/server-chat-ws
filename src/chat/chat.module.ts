import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports:[TypeOrmModule],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}

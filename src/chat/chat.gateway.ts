import { WebSocketGateway } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  handleDisconnect(client: any) {
    console.log("conectado");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("disconnected");
  }

}

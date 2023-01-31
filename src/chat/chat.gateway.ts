import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsException, MessageBody } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { Socket, Server } from 'socket.io';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { MessageDto } from './dto/message.dto';
import { ChatService } from './services/chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;

    if(!token) throw new WsException('Token missing or incorrect');

    let payload: JwtPayload;

    try {
      
      payload = this.jwtService.verify( token );
      await this.chatService.registerClient( client, payload.id );
      
      
    } catch (error) {
      console.log(error);
      client.disconnect();
      return;
    }
    
    const clients = this.chatService.getOnlineClients();
    this.wss.emit("getOnlineClients", clients);
  }

  handleDisconnect(client: Socket) {
    this.chatService.removeClient(client);
  }

  @SubscribeMessage('message-from-client')
  handlerMessageFromClient(@MessageBody() message:MessageDto){

    console.log(message);
  }



  

  

}

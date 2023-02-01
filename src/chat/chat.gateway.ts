import { Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsException, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { Socket, Server } from 'socket.io';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { User as UserEntity } from 'src/users/entities';
import { MessageDto } from './dto/message.dto';
import { UserDto } from './dto/user.dto';
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
  async handlerMessageFromClient(
    @MessageBody() data:MessageDto,
    @ConnectedSocket() client: Socket){
    
    try {
      await this.chatService.saveChat(data);

      const userOne = this.chatService.getClientById(client.id);
      console.log(userOne.user);
      if(!userOne) return null;
      
      console.log("leegue aqui");
      client.to(data.socketId).emit('message-from-server', {
        message:data.message,
        userId:userOne.user.id,
        socketId: client.id
      });
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  @SubscribeMessage('get-client-messages')
  async handlerGetClientMessages ( 
    @MessageBody() user: UserDto,
    @ConnectedSocket() client: Socket){

      const userOne = this.chatService.getClientById(client.id);
      if(!userOne) return null;
      
      const messages =  await this.chatService.getClientMessagesPlain( userOne.user.id, user.userId );
      console.log({messages});

      client.emit('send-client-messages', { messages });

      

  } 


}

import { Injectable, BadGatewayException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { SocketClient } from '../interfaces/socket-client.interface';
import { ConversationService } from './conversation.service';

@Injectable()
export class ChatService {

    private clients:SocketClient = {};
    private onlineUsers = [];

    constructor(
        private readonly userService: UsersService,
        private readonly conversationService: ConversationService
    ){}

    async registerClient ( client: Socket, userId: string ): Promise<void>{

        const userEntity  = await this.userService.findOne(userId);
        if(!userEntity) throw new BadGatewayException();

        this.clients[client.id] = {
            socket:client,
            user:{
                id: userEntity.id,
                name:userEntity.name
            }
        };

        this.onlineUsers.push({
            socketId: client.id,
            userId: userEntity.id,
            name: userEntity.name
        });
    }

    removeClient( client: Socket ):void {
        delete this.clients[client.id];
        this.onlineUsers = this.onlineUsers.filter( user => user.socketId !== client.id );
        // console.log(this.onlineUsers);
    }

    getOnlineClients () {

        return this.onlineUsers;
    }


    
}

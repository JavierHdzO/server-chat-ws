import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { User } from 'src/users/entities';
import { ConversationService } from './conversation.service';
import { UsersService } from 'src/users/users.service';
import { MessageDto } from '../dto/message.dto';
import { Conversation } from '../entities';
import { SocketClient } from '../interfaces/socket-client.interface';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

    private logger = new Logger(ChatService.name);
    private user: User;
    private clients:SocketClient = {};
    private onlineUsers = [];

    constructor(
        private readonly userService: UsersService,
        private readonly conversationService: ConversationService
    ){}

    async registerClient ( client: Socket, userId: string ): Promise<void>{

        this.user  = await this.userService.findOne(userId);
        if(!this.user) throw new WsException('Not Authorized');

        this.clients[client.id] = {
            socket:client,
            user:{
                id: this.user.id,
                name:this.user.name
            }
        };

        this.onlineUsers.push({
            socketId: client.id,
            userId: this.user.id,
            name: this.user.name
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

    async saveChat( message: MessageDto ){

        const { userId, message:messageReceived } = message;

        const toUser = await this.userService.findOne( userId );
        if( !toUser ) throw new WsException('User not found');
        
        let conversation: Conversation;
        try {
            conversation = await this.conversationService.findOneAndUpdate(this.user, toUser, messageReceived);
            // console.log(conversation);
            if( !conversation ){
                console.log("se creo una nueva conversacion");
                conversation = await this.conversationService.createConversation( this.user, toUser, messageReceived );
            }
            console.log("se encontro la conversacion");
            
            return this.user.id;

        } catch (error) {
            this.logger.error(error);
            console.log(error);
            return null;
        }
        
    }

    async getClientMessages(userOneId: string, userTwoId: string){

        const userOne  = await  this.userService.findOne(userOneId);
        const userTwo =  await this.userService.findOne(userTwoId);


        if(!userOne || !userTwo) throw new WsException('Bad request');

        const conversacion = await this.conversationService.findOneByUsers(userOne, userTwo);
        console.log(conversacion);

        if(!conversacion) throw new WsException('Bad request');

        return await this.conversationService.findMessageByConversation(conversacion);

    }

    async getClientMessagesPlain(userOneId: string, userTwoId: string): Promise<any>{
        
        try {
            const messagesEntity = await this.getClientMessages( userOneId, userTwoId );

            if(messagesEntity.length <= 0) return [];

            let messages: Message[] = [];

            messagesEntity.forEach( messageEntity => {
                messages.push({
                    message: messageEntity.message,
                    userId: messageEntity.id,
                    name: messageEntity.user.name
                });
            });

            console.log(messages);
            return messages;
        } catch (error) {
            console.log(error);
            this.logger.error(error);
            return [];
        }
        
    }


    getClientById(clientId:string){
        return this.clients[clientId];
    }


    
}

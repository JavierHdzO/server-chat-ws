import { User } from 'src/users/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Conversation } from './conversation.entity';

export class Message{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'text'
    })
    message:string;

    @Column({
        type:'timestamp'
    })
    sent_datetime: Date;

    @ManyToOne( 
        type => User, //Entity Class
        user => user.messages 
        )
    user: User

    @ManyToOne( type => Conversation, conversation => conversation.messages )
    conversation: Conversation;
    
}
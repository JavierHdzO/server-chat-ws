import { User } from 'src/users/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity()
export class Message{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'text'
    })
    message:string;

    @Column({
        type:'timestamp',
        default: () => "CURRENT_TIMESTAMP"
    })
    sent_datetime: Date;

    @ManyToOne( 
        () => User, //Entity Class
        user => user.messages,
    { eager: true })
    user: User

    @ManyToOne( () => Conversation, conversation => conversation.messages )
    conversation?: Conversation;
    
}
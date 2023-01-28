import { User } from 'src/users/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Conversation{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'text',
        default:''
    })
    name:string;

    @ManyToMany( type => User, user => user.conversations)
    members: User[];

    @OneToMany( type => Message, message => message.conversation)
    messages: Message[];
    

}
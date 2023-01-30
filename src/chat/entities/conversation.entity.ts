import { User } from 'src/users/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
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

    @ManyToMany( () => User)
    @JoinTable()
    members: User[];

    @OneToMany( () => Message, message => message.conversation, {eager:true})
    messages: Message[];
    

}
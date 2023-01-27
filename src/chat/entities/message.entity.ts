import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Message{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'timestamp'
    })
    sent_datetime: Date;

    @Column({
        type:'text'
    })
    message:string;

    @Column()
    sender_user_id

    @Column()
    sender_keep

    reply_to_message_id


    @Column()
    thread_root_message_id

    
}
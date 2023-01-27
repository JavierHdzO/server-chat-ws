import { bool } from 'joi';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'text',
        default:''
    })
    name:string;

    @Column({
        type:'bool',
        default: true
    })
    status:boolean;

    

}
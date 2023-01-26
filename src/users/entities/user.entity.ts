import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type: 'text',
        nullable:false,
        unique: true
    })
    name:string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'text',
        nullable: false
    })
    password: string;

    @Column({
        type:'bool',
        default: false
    })
    google: boolean;

    @Column({
        type:'bool',
        default: true
    })
    status: boolean;

}

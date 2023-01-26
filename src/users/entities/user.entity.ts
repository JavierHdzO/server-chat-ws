import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type: 'text',
        nullable:false
    })
    name:string;

    @Column({
        type: 'text',
        nullable: false
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

}

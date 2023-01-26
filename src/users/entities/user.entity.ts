import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

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

    @BeforeInsert()
    hashPassword(){
        const salt = genSaltSync( 10 );
        this.password =  hashSync(this.password, salt);
    }

}

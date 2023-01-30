import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';
import { Conversation, Message } from 'src/chat/entities';

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
        type:'text',
        array:true,
        default:['user']
    })
    roles:string[];

    @Column({
        type:'bool',
        default: true
    })
    status: boolean;

    // @ManyToMany( () => Conversation, conversation => conversation.members, {
    //     eager: true
    // } )
    // @JoinTable()
    // conversations?: Conversation[];

    @OneToMany( () => Message, message => message.user)
    messages?: Message[];

    @BeforeInsert()
    hashPassword(){
        const salt = genSaltSync( 10 );
        this.password =  hashSync(this.password, salt);
    }

}

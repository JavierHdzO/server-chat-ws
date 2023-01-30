import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities';
import { Conversation, Message } from './entities';

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>
    ){}

//     const conversation = await connection
//   .getRepository(Conversation)
//   .createQueryBuilder("conversation")
//   .leftJoin("conversation.user1", "user1")
//   .leftJoin("conversation.user2", "user2")
//   .where("(user1.id = :user1Id AND user2.id = :user2Id) OR (user1.id = :user2Id AND user2.id = :user1Id)", {
//     user1Id: user1Id,
//     user2Id: user2Id
//   })
//   .getOne();


    async createConversation(){

        const user = await this.userRepository.findOneBy({id:'0e3d1273-4a7a-4b7f-8b2a-4d400f4835e3'});
        const user2 = await this.userRepository.findOneBy({id:'dd6365cc-13b6-4f63-870b-c9aa6c10c225'});
        
        
       
        const conversation =  this.conversationRepository.create({
            name:'Primer teste',
            messages:[await this.messageRepository.save(this.messageRepository.create({
                message:'Mensaje de prueba',
                user
            }))],
            members:[user, user2]
        });

        const savedConv = await this.conversationRepository.save(conversation);

        console.log( savedConv );
    }

    async findOneConversation( ): Promise<Conversation>{

        // if(!userOne.id || !userTwo.id) return null;
        const conversation = await this.conversationRepository.createQueryBuilder("conversation")
        .leftJoinAndSelect('conversation.members', "user1")
        .leftJoinAndSelect('conversation.members', "user2")
        // .leftJoinAndSelect('conversation.messages', "message")
        // .leftJoinAndSelect('message.user', "user")
        // .orderBy('message.sent_datetime', 'ASC')
        .where('(user1.id = :user1Id and user2.id = :user2Id) or (user1.id = :user2Id and user2.id = :user1Id)',
        {
            user1Id:'dd6365cc-13b6-4f63-870b-c9aa6c10c225',
            user2Id:'0e3d1273-4a7a-4b7f-8b2a-4d400f4835e3',
        })
        .getOne();

        
        

        return conversation;

    }

    async findMessageByConversation( conversationParam: Conversation): Promise<Message[]>{

        const conversation = await this.conversationRepository.createQueryBuilder("conversation")
            .leftJoinAndSelect("conversation.messages", 'message')
            .leftJoinAndSelect("message.user", "user")
            .orderBy("message.sent_datetime", "ASC")
            .where("conversation.id = :conversationId", { conversationId: conversationParam.id })
            .getOne();
        
        if( !conversation ) throw new Error();

        // const conversation =
        
        console.log(conversation.messages);
        return conversation.messages;

    }

    async updateConversation(){

    }

    async deleteConversation(){

    }

    


}

// [
//     Conversation {
//       id: 'c6ace5a4-24a1-469c-9255-eb9f40a0179d',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: '57125199-d031-4407-93fb-f005502fde88',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: '2282bb86-967c-4c7a-925c-8154c6eaaff7',
//       name: 'prueba'
//     },

//     Conversation {
//       id: '10c2bac0-bc37-41bd-8dc8-ec4594fbc8b7',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: '86086dd4-fafc-470c-ac6a-45986bc805ca',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: 'dc3efdad-7ce7-4ed3-8336-b647d6c4d389',
//       name: 'prueba'
//     },

//     Conversation {
//       id: '2c042d15-558d-4345-8e81-b4f4fd1a9ece',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: '7b010d47-9abf-48bf-98e1-62455561f066',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: 'd51ce230-0d67-499b-8a99-f7ee7d935ad3',
//       name: 'prueba'
//     },

//     Conversation {
//       id: 'f8d05894-3ff4-421b-9d73-1469a14e59d2',
//       name: 'prueba'
//     },

//     Conversation {
//       id: '935ece90-065d-48e3-8b99-bc786d6ee0a9',
//       name: 'Primer teste'
//     },

//     Conversation {
//       id: 'dd2733bb-1482-4f85-970a-30ee07e72d45',
//       name: 'prueba'
//     },

//     Conversation {
//       id: '94deb9da-8859-4387-ab93-4e9072eba169',
//       name: 'prueba'
//     }

//   ]
  

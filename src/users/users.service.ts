import { Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid'
import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create( createUserDto );
      await this.userRepository.save(user);
      delete createUserDto.password;
      return  createUserDto;

    } catch (error) {
      this.handlerException(error);
    }
  }

  async findAll({ limit=10, offset=0 }) {

    try{
      const users = await  this.userRepository.find({
        where: { status: true }, 
        select:{ email: true, name: true, id: true },
        take: limit,
        skip: offset
      })
      return users;
    }
    catch(error){
      this.handlerException(error);
    }
  }
  
  async findOnePlainText(term: string){

    const user: User = await this.findOne(term);
    delete user.password;
    delete user.status;

    return user;
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
      
        
      try{
        const user = await this.userRepository.preload({
          id,
          ...updateUserDto
        });

        delete user.password;
        delete user.status;
        delete user.google;
        return user;

      }catch(error){
        this.handlerException(error);
      }
  }

  async remove(id: string) {

    const user = await this.userRepository.preload({id, status: false});

    if( !user ) throw new NotFoundException('User not found');

    return {message:'User has been deleted'};
  }

  async findOne(term: string) {
    
    let user: User;
    if(validate(term)){
        user = await this.userRepository.findOneBy({ id: term });
    }else{
      user = await this.userRepository.createQueryBuilder("user")
          .select(['user.id', 'user.email', 'user.name', 'user.password','user.status'])
          .where("user.name = :name OR user.email = :email", {
            email: term,
            name: term
          })
          .getOne();
      }
    if(!user || !user.status) throw new NotFoundException('User not found');

    return user;
  
  }


  private handlerException(error: any){
    console.log(error);
    this.logger.error(error);
    if(error.code === '23505') throw new BadRequestException(`${error.detail}`);
    
    throw new InternalServerErrorException('Report to the admin');
  }

  
}

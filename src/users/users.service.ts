import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

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
      const aux = await this.userRepository.save(user);

      console.log(aux);

      return user;

    } catch (error) {
      this.handlerException(error);
    }
  }

  findAll() {
    return {message:`This action returns all users`};
  }

  findOne(id: number) {
    return {message:`This action returns a #${id} user`};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return {message:`This action updates a #${id} user`};
  }

  remove(id: number) {
    return {message:`This action removes a #${id} user`};
  }


  private handlerException(error: any){
    this.logger.error(error);
    if(error.code === '23505') throw new BadRequestException(`${error.detail}`);
  }
}

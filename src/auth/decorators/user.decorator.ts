
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { User as UserEntity } from 'src/users/entities';

export const User = createParamDecorator(
    (data:string, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        const user:UserEntity = req.user;
        if(!user) throw new InternalServerErrorException();

        delete user.password;
        delete user.google;
        delete user.status;
        return data ? user?.[data]: user;
    },

);
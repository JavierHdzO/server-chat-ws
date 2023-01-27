
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
    (data:string, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if(!user) throw new InternalServerErrorException();

        return data ? user ?.[data]:user;
    },

);
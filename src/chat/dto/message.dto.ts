import { IsString, MinLength, IsUUID } from 'class-validator';

export class MessageDto{

    @IsString()
    @MinLength(1)
    @IsUUID()
    userId: string;

    @IsString()
    @MinLength(5)
    socketId: string;
}
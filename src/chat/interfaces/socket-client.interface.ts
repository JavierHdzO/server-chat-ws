import { Socket } from "socket.io";

export interface SocketClient {
    [id: string]: {
        socket: Socket,
        user: UserWS
    }
}

export interface UserWS {
    id:string,
    name:string
}
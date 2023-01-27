import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration, validationSchema } from './config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configuration],
      validationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.HOST_DB,
      port:Number(process.env.PORT_DB),
      username:process.env.USERNAME_DB,
      password:process.env.PASSWORD_DB,
      database:process.env.NAME_DB,
      entities:[ User ],
      synchronize: true
    }),
    
    CommonModule,
    UsersModule,
    AuthModule,
    ChatModule
  ],
  providers: []
})
export class AppModule {}

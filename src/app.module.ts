import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";
import {User} from "./users/user.model";
import {Role} from "./roles/roles.model";
import { RolesModule } from './roles/roles.module';
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfileModule } from './profile/profile.module';
import * as path from 'path';
import {Profile} from "./profile/profile.model";
import { TextBlockModule } from './text-block/text-block.module';
import {TextBlock} from "./text-block/text-block.model";
import {File} from "./files/files.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static')
      }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Profile, TextBlock, File],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    ProfileModule,
    TextBlockModule,
  ]
})
export class AppModule {}

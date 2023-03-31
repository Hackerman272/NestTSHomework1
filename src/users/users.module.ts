import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../roles/roles.model";
import {RolesService} from "../roles/roles.service";
import {RolesModule} from "../roles/roles.module";
import {UserRoles} from "../roles/user-roles.model";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";
import {ProfileModule} from "../profile/profile.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Post]),
      RolesModule,
      // боремся с кольцевой зависимостью auth и user
      forwardRef( () => AuthModule),
      forwardRef( () => ProfileModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}

import {forwardRef, Module} from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {AuthModule} from "../auth/auth.module";
import {User} from "../users/user.model";


@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    forwardRef( () => AuthModule),
    SequelizeModule.forFeature([Profile, User]),
  ],
  exports: [
    ProfileService,
  ]
})
export class ProfileModule {}

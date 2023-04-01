import {forwardRef, Module} from '@nestjs/common';
import { FilesService } from './files.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {File} from "./files.model";
import {FilesController} from "./files.controller";
import {AuthModule} from "../auth/auth.module";
import {ProfileModule} from "../profile/profile.module";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
  imports: [
    SequelizeModule.forFeature([File]),
    forwardRef( () => AuthModule),
    forwardRef( () => ProfileModule),
  ]
})
export class FilesModule {}

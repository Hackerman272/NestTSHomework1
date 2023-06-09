import {forwardRef, Module} from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {TextBlock} from "./text-block.model";
import {AuthModule} from "../auth/auth.module";
import {ProfileModule} from "../profile/profile.module";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [TextBlockService],
  controllers: [TextBlockController],
  imports: [
    forwardRef( () => AuthModule),
    forwardRef( () => ProfileModule),
    forwardRef( () => FilesModule),
    SequelizeModule.forFeature([TextBlock])
  ]
})
export class TextBlockModule {}

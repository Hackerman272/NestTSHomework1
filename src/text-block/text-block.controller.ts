import {
    Body,
    Controller,
    Get,
    ParseFilePipe,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TextBlockService} from "./text-block.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {EditTextBlockDto} from "./dto/edit-text-block.dto";
import {DeleteTextBlockDto} from "./dto/delete-text-block.dto";
import {GetTextBlockDto} from "./dto/get-text-block.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('text-block')
export class TextBlockController {
    constructor(private textBlockService: TextBlockService) {
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'previewImage', maxCount: 1},
        { name: 'screenshots', maxCount: 5 },
    ]))
    createTextBlock(@Body() dto: CreateTextBlockDto,
                    @UploadedFiles(
                        new ParseFilePipe(
                            {
                                    fileIsRequired: true,
                    }),)
                        files: { previewImage?: Express.Multer.File[], screenshots?: Express.Multer.File[]}
                    )
    {
        return this.textBlockService.create(dto, files)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/edit')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'previewImage', maxCount: 1},
        { name: 'screenshots', maxCount: 5 },
    ]))
    editTextBlock(@Body() dto: EditTextBlockDto,
                  @UploadedFiles(
                      new ParseFilePipe(
                          {
                              fileIsRequired: false,
                          }),)
                      files: { previewImage?: Express.Multer.File[], screenshots?: Express.Multer.File[]}
    ){
        return this.textBlockService.edit(dto, files)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/delete')
    deleteTextBlock(@Body() dto: DeleteTextBlockDto){
        return this.textBlockService.delete(dto)
    }

    @Get()
    getTextBlocks(@Query() dto: GetTextBlockDto){ // ??? как работать с параметрами?
        return this.textBlockService.get(dto)
    }
}

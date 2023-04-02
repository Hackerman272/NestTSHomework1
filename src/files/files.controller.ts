import {Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {FilesService} from "./files.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {EditFilesDto} from "./dto/edit-files.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DeleteFilesDto} from "./dto/delete-files.dto";
import {GetFilesDto} from "./dto/get-files.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {
    }
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    addFile(@UploadedFile() image){
        // в ответе есть название файла, добавив к домену которое можно сделать предпросмотр загруженного файла
        // Вопрос: есть ли необходимость в целях безопасности убрать filePath из ответа?
        return this.filesService.createFile(image)
    }

    // Прикрепление файла к сущности через редактирование
    // по API возможность привязывать скриншоты не выдаю никому, кроме админа, чтобы нельзя было пользователю закинуть
    // скриншоты к чужим постам, например.
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/edit')
    editFiles(@Body() dto: EditFilesDto){
        return this.filesService.edit(dto)
    }


    @ApiOperation({summary: "Получение в т.ч. названий для составления ссылок на файлы"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/byValues')
    getFilesByValues(@Body() dto: GetFilesDto){
        return this.filesService.getFilesByValues(dto);
    }

    @ApiOperation({summary: "Удаление файла"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/delete')
    delete(@Body() dto: DeleteFilesDto){
        return this.filesService.deleteFiles(dto);
    }

    @ApiOperation({summary: "Удаление файла"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/deleteOlds')
    deleteOlds(){
        return this.filesService.deleteUnusedFiles();
    }

    @ApiOperation({summary: "Получение в т.ч. названий для составления ссылок на файлы"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getFiles(){
        return this.filesService.getFiles();
    }
}

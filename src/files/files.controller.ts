import {Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {FilesService} from "./files.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {EditFilesDto} from "./dto/edit-files.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DeleteFilesDto} from "./dto/delete-files.dto";
import {GetFilesDto} from "./dto/get-files.dto";

@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {
    }
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    addFile(@UploadedFile() image){
        // в ответе есть название файла, добавив к домену которое можно сделать предпросмотр загруженного файла
        // есть ли необходимость в целях безопасности убрать filePath из ответа?
        return this.filesService.createFile(image)
    }

    // по API возможность привязывать скриншоты не выдаю никому, кроме админа, чтобы нельзя было пользователю закинуть
    // скриншоты к чужим постам, например.
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/edit')
    editTextBlock(@Body() dto: EditFilesDto){
        return this.filesService.edit(dto)
    }

    @ApiOperation({summary: "Удаление файла"})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/delete')
    delete(@Body() dto: DeleteFilesDto){
        return this.filesService.deleteFiles(dto);
    }

    @ApiOperation({summary: "Удаление файла"})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/deleteOlds')
    deleteOlds(){
        return this.filesService.deleteUnusedFiles();
    }

    @ApiOperation({summary: "Получение в т.ч. названий для составления ссылок на файлы"})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getFiles(){
        return this.filesService.getFiles();
    }

    @ApiOperation({summary: "Получение в т.ч. названий для составления ссылок на файлы"})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/byValues')
    getFilesByValues(@Body() dto: GetFilesDto){
        return this.filesService.getFilesByValues(dto);
    }
}

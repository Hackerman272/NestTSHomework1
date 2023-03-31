import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {TextBlockService} from "./text-block.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {EditTextBlockDto} from "./dto/edit-text-block.dto";
import {DeleteTextBlockDto} from "./dto/delete-text-block.dto";
import {GetTextBlockDto} from "./dto/get-text-block.dto";

@Controller('text-block')
export class TextBlockController {
    constructor(private textBlockService: TextBlockService) {
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createTextBlock(@Body() dto: CreateTextBlockDto){
        return this.textBlockService.create(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/edit')
    editTextBlock(@Body() dto: EditTextBlockDto){
        return this.textBlockService.edit(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/delete')
    deleteTextBlock(@Body() dto: DeleteTextBlockDto){
        return this.textBlockService.delete(dto)
    }

    @Get()
    getTextBlocks(@Param() dto: GetTextBlockDto){ // ??? как работать с параметрами?
        return this.textBlockService.get(dto)
    }
}

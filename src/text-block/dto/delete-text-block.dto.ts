import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class DeleteTextBlockDto {
    @ApiProperty({example: '123', description: "id блока текста"})
    @IsNumber()
    readonly textBlockId: number;
}

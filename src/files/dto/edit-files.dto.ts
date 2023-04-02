import {
    IsArray,
    IsNumber,
    IsString,
    MaxLength,
    ValidateIf
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class EditFilesDto {
    @ApiProperty({example: [1, 2, 3], description: "id скриншотов для привязки"})
    @IsArray()
    readonly filesIds: number[];

    @ApiProperty({example: 'text-blocks', description: "название таблицы"})
    @IsString({message: "Должна быть строка"})
    @MaxLength(30, {message: 'От 1 по 30 символов'})
    @ValidateIf((object, value) => value !== null)
    readonly essenceTable: string | null;

    @ApiProperty({example: 123, description: "id строки, к которой относится изображение"})
    @IsNumber({allowNaN: true})
    @ValidateIf((object, value) => value !== null)
    readonly essenceId: number | null;
}

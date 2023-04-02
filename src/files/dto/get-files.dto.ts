import {IsArray, IsNumber, IsOptional, IsString, Length, MaxLength, ValidateIf} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetFilesDto {
    @ApiProperty({example: [1, 2, 3], description: "id скриншотов для привязки"})
    @IsArray({message: "Должен быть массив"})
    @IsOptional()
    readonly id: number[] | null;

    @ApiProperty({example: 'text-blocks', description: "название таблицы"})
    @IsString({message: "Должна быть строка"})
    @MaxLength(30, {message: 'От 1 по 30 символов'})
    @ValidateIf((object, value) => value !== null)
    @IsOptional()
    readonly essenceTable: string | null;

    @ApiProperty({example: 123, description: "id строки, к которой относится изображение"})
    @IsNumber({allowNaN: true}, {message: "Нужно число"})
    @ValidateIf((object, value) => value !== null)
    @IsOptional()
    readonly essenceId: number | null;
}

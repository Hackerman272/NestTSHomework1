import {IsArray, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class EditTextBlockDto {
    @IsNumber()
    readonly textBlockId: number;

    @ApiProperty({example: 'main-hero-text', description: "Уникальное название блока текста"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    @IsOptional()
    readonly uniqueTitle: string;

    @ApiProperty({example: 'Главный герой 123', description: "Название блока текста для читателя"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 100, {message: 'От 1 по 100 символов'})
    @IsOptional()
    readonly title: string;

    @ApiProperty({example: 'Много текста. Много текста. Много текста',
        description: "Блок текста"})
    @IsString({message: "Должна быть строка"})
    @IsOptional()
    readonly contentText: string;

    @ApiProperty({example: 'main-page', description: "Группа"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    @IsOptional()
    readonly group: string;

    @ApiProperty({example: [1, 2, 3], description: "id скриншотов для отвязки"})
    @IsArray()
    @IsOptional()
    readonly unlinkFilesIds: number[];

}

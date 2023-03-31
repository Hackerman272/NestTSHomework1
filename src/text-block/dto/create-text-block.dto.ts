import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateTextBlockDto {
    @ApiProperty({example: 'main-hero-text', description: "Уникальное название блока текста"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    readonly uniqueTitle: string;

    @ApiProperty({example: 'Главный герой 123', description: "Название блока текста для читателя"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 100, {message: 'От 1 по 100 символов'})
    readonly title: string;

    @ApiProperty({example: 'Много текста. Много текста. Много текста',
        description: "Блок текста"})
    @IsString({message: "Должна быть строка"})
    readonly contentText: string;

    @ApiProperty({example: 'main-page', description: "Группа"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    readonly group: string;

}

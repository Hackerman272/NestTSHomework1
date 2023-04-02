import {IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import {toNumber, trim} from "../../common/helper/cast.helper";

export class GetTextBlockDto {
    // Transform для работы с параметрами запроса
    @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
    @IsNumber()
    @IsOptional()
    readonly id: number;

    @Transform(({ value }) => trim(value))
    @ApiProperty({example: 'main-hero-text', description: "Уникальное название блока текста"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    @IsOptional()
    readonly uniqueTitle: string;

    @Transform(({ value }) => trim(value))
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

    @Transform(({ value }) => trim(value))
    @ApiProperty({example: 'main-page', description: "Группа"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    @IsOptional()
    readonly group: string;
}

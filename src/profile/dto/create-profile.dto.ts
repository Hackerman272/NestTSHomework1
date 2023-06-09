import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsPhoneNumber, IsString, Length, MaxLength} from "class-validator";

export class CreateProfileDto {

    @ApiProperty({example: 'test@test.com', description: "Уникальный адрес почты"})
    @IsString({message: "Должна быть строка"})
    @IsEmail({}, {message: "не email"})
    readonly email: string;

    @ApiProperty({example: '654321', description: "Пароль пользователя"})
    @IsString({message: "Должна быть строка"})
    @Length(4, 16, {message: 'От 4 по 16 символов'})
    readonly password: string;

    @ApiProperty({example: 'Василий', description: "Имя"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    readonly name: string;

    @ApiProperty({example: 'Васильев', description: "Фамилия"})
    @IsString({message: "Должна быть строка"})
    @Length(1, 30, {message: 'От 1 по 30 символов'})
    readonly surname: string;

    @ApiProperty({example: 'Васильевич', description: "Отчество"})
    @IsOptional()
    @IsString({message: "Должна быть строка"})
    @MaxLength(30, {message: 'до 30 символов'})
    readonly middleName: string;

    @ApiProperty({example: '8-800-555-35-35', description: "Отчество"})
    @IsString({message: "Должна быть строка"})
    @IsPhoneNumber('RU')
    readonly phoneNumber: string;
}

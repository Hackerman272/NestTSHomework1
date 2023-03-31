import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'test@test.com', description: "Уникальный адрес почты"})
    @IsString({message: "Должна быть строка"})
    @IsEmail({}, {message: "не email"})
    readonly email: string;

    @ApiProperty({example: '654321', description: "Пароль пользователя"})
    @IsString({message: "Должна быть строка"})
    @Length(4, 16, {message: 'От 4 по 16 символов'})
    readonly password: string;
}

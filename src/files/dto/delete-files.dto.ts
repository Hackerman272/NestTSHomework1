import {
    IsArray,
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
    MaxLength,
    ValidateIf
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DeleteFilesDto {
    @ApiProperty({example: [1, 2, 3], description: "id файлов для удаления"})
    @IsArray()
    readonly filesIds: number[];
}

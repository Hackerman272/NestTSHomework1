import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Profile} from "./profile.model";
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {DeleteProfileDto} from "./dto/delete-profile.dto";
import {EditProfileDto} from "./dto/edit-profile.dto";
import {User} from "../users/user.model";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }
    @ApiOperation({summary: "Создание профиля"})
    @ApiResponse({status: 200, type: Profile})
    @UsePipes(ValidationPipe) // удобное отображение не прошедших валидацию полей
    @Post() // тип запроса
    create(@Body() profileDto: CreateProfileDto) {
        return this.profileService.createProfile(profileDto);
    }

    @ApiOperation({summary: "Удаление профиля"})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN") // Роли, которым доступен запрос
    @UsePipes(ValidationPipe)
    @UseGuards(RolesGuard) // Вызов кода проверки ролей И проверки того, что профиль принадлежит автору запроса. Потенциальная уязвимость для иных модулей, можно сделать 2 метода для профиля и остальных
    @Post('/delete')
    delete(@Body() profileDto: DeleteProfileDto){
        return this.profileService.deleteProfile(profileDto);
    }

    @ApiOperation({summary: "Изменение профиля"})
    @ApiResponse({status: 200, type: Profile})
    @Roles("ADMIN", "MYSELF")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post('/edit')
    edit(@Body() profileDto: EditProfileDto) {
        return this.profileService.editProfile(profileDto);
    }

    @ApiOperation({summary: "Получить все профили"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Get()
    getAll(){
        return this.profileService.getAllProfiles();
    }
}

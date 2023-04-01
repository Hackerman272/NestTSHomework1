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
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() profileDto: CreateProfileDto) {
        return this.profileService.createProfile(profileDto);
    }

    @ApiOperation({summary: "Удаление профиля"})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
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
    // @UseGuards(JwtAuthGuard)  // проверка по токену
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.profileService.getAllProfiles();
    }
}

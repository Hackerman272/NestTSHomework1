import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {AuthService} from "../auth/auth.service";
import {DeleteProfileDto} from "./dto/delete-profile.dto";
import {EditProfileDto} from "./dto/edit-profile.dto";
import {UsersService} from "../users/users.service";

// делаем внедряемым в другие сервисы с помощью Injectable
@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile, // внедряем модель через InjectModel
                private authService: AuthService,
                private userService: UsersService) {}

    // dto позволяет управляет передаваемыми данными в сервис, в т.ч. их валидировать.
    async createProfile(dto: CreateProfileDto) {
        const newUser = await this.authService.registration(dto)
        const profile = await this.profileRepository.create({...dto, userId: newUser.userId}); // добавляем к полям с dto ещё поле
        return {profileInfo: profile, authInfo: newUser.authInfo}; // возвращаем из сервиса объект для дальнейшего использования в коде, или внешними сервисами (через контроллер)
    }

    async deleteProfile(dto: DeleteProfileDto) {
        const profile = await this.profileRepository.findByPk(dto.profileId);
        if (!profile) {
            throw new HttpException('Профиля не существует', HttpStatus.NOT_FOUND)
        }
        await this.profileRepository.destroy({where: {id: dto.profileId}}); // удаляем профиль

        // надо удалять или банить пользователя при удалении профиля? Если просто банить, адрес почты блокируется для повторного использования.
        await this.userService.ban({userId: profile.userId, banReason: "Профиль пользователя удалён"}) // баним юзера (теоретически можно удалять, зависит от требований заказчика кода). При удалении user профиль будет удаляться т.к. связь ON DELETE CASCADE
    }

    async editProfile(dto: EditProfileDto) {
        const profile = await this.profileRepository.findByPk(dto.profileId);
        if (!profile) {
            throw new HttpException('Профиля не существует', HttpStatus.NOT_FOUND)
        }
        await this.profileRepository.update({...dto}, {where: {id: dto.profileId}});
    }

    async getUserIdByProfileId(profileId: number) {
        const profile = await this.profileRepository.findByPk(profileId);
        if (!profile) {
            throw new HttpException('Профиля не существует', HttpStatus.NOT_FOUND)
        }
        return profile.userId
    }


    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll({include: {all: true}})
        return profiles;
    }
}

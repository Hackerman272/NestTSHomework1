import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {AuthService} from "../auth/auth.service";
import {DeleteProfileDto} from "./dto/delete-profile.dto";
import {EditProfileDto} from "./dto/edit-profile.dto";
// import {EditProfileDto} from "./dto/add-role.dto";
// import {DeleteProfileDto} from "./dto/ban-Profile.dto";

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private authService: AuthService) {
    }
    async createProfile(dto: CreateProfileDto) {
        const newUser = await this.authService.registration(dto)
        const profile = await this.profileRepository.create({...dto, userId: newUser.userId});
        return {profileInfo: profile, authInfo: newUser.authInfo};
    }

    async deleteProfile(dto: DeleteProfileDto) {
        const profile = await this.profileRepository.findByPk(dto.profileId);
        if (!profile) {
            throw new HttpException('Профиля не существует', HttpStatus.NOT_FOUND)
        }
        await this.profileRepository.destroy({where: {id: dto.profileId}});
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

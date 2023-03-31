import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {TextBlock} from "./text-block.model";
import {DeleteTextBlockDto} from "./dto/delete-text-block.dto";
import {EditTextBlockDto} from "./dto/edit-text-block.dto";
import {GetTextBlockDto} from "./dto/get-text-block.dto";

@Injectable()
export class TextBlockService {
    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock) {
    }
    async create(dto: CreateTextBlockDto) {
        const textBlock = await this.textBlockRepository.create({...dto})
        return textBlock;
    }
    async delete(dto: DeleteTextBlockDto) {
        const textBlock = await this.textBlockRepository.findByPk(dto.textBlockId);
        if (!textBlock) {
            throw new HttpException('Текстового блока не существует', HttpStatus.NOT_FOUND)
        }
        await this.textBlockRepository.destroy({where: {id: dto.textBlockId}});
    }

    async edit(dto: EditTextBlockDto) {
        const textBlock = await this.textBlockRepository.findByPk(dto.textBlockId);
        if (!textBlock) {
            throw new HttpException('Текстового блока не существует', HttpStatus.NOT_FOUND)
        }
        await this.textBlockRepository.update({...dto}, {where: {id: dto.textBlockId}});
    }

    async get(dto: GetTextBlockDto) {
        const textBlocks = await this.textBlockRepository.findAll({where: {...dto}})
        return textBlocks;
    }
}

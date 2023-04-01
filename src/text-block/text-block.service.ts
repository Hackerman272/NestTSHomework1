import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateTextBlockDto} from "./dto/create-text-block.dto";
import {TextBlock} from "./text-block.model";
import {DeleteTextBlockDto} from "./dto/delete-text-block.dto";
import {EditTextBlockDto} from "./dto/edit-text-block.dto";
import {GetTextBlockDto} from "./dto/get-text-block.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class TextBlockService {
    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
                private fileService: FilesService) {
    }
    async create(dto: CreateTextBlockDto, files: object) {
        const textBlocks = await this.textBlockRepository.findAll({where:
                {uniqueTitle: dto.uniqueTitle}})
        if (textBlocks.length > 0){
            throw new HttpException(`Текстовый блок c uniqueTitle "${dto.uniqueTitle}" уже есть`, HttpStatus.BAD_REQUEST)
        }
        const textBlock = await this.textBlockRepository.create({...dto})
        for (let filesArr in files) {
            files[filesArr].forEach(file => this.fileService.createFile(file, this.textBlockRepository.tableName,
                textBlock.id))
        }
        return textBlock;
    }
    async delete(dto: DeleteTextBlockDto) {
        const textBlock = await this.textBlockRepository.findByPk(dto.textBlockId);
        if (!textBlock) {
            throw new HttpException('Текстового блока не существует', HttpStatus.NOT_FOUND)
        }
        await this.textBlockRepository.destroy({where: {id: dto.textBlockId}});
        await this.fileService.makeFilesUnused(dto.textBlockId, this.textBlockRepository.tableName)
    }

    async edit(dto: EditTextBlockDto, files: object) {
        if (dto.uniqueTitle){
            const textBlocks = await this.textBlockRepository.findAll({where:
                    {uniqueTitle: dto.uniqueTitle}})
            if (textBlocks.length > 0){
                throw new HttpException(`Текстовый блок c uniqueTitle "${dto.uniqueTitle}" уже есть`, HttpStatus.BAD_REQUEST)
            }
        }
        const textBlock = await this.textBlockRepository.findByPk(dto.textBlockId);
        if (!textBlock) {
            throw new HttpException('Текстового блока не существует', HttpStatus.NOT_FOUND)
        }
        for (let filesArr in files) {
            files[filesArr].forEach(file => this.fileService.createFile(file, this.textBlockRepository.tableName,
                textBlock.id))
        }
        await this.textBlockRepository.update({...dto}, {where: {id: dto.textBlockId}});
        if (dto.unlinkFilesIds) {
            await this.fileService.edit({
                filesIds: dto.unlinkFilesIds, essenceTable: null, essenceId: null
            })
        }
    }

    async get(dto: GetTextBlockDto) {
        console.log({...dto})
        const textBlocks = await this.textBlockRepository.findAll({where: {...dto}})
        return textBlocks;
    }
}

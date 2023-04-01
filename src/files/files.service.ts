import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {File} from "./files.model";
import {EditFilesDto} from "./dto/edit-files.dto";
import {DeleteFilesDto} from "./dto/delete-files.dto";
import {Op} from "sequelize";
import {GetTextBlockDto} from "../text-block/dto/get-text-block.dto";
import {GetFilesDto} from "./dto/get-files.dto";

@Injectable()
export class FilesService {
    constructor(@InjectModel(File) private fileRepository: typeof File) {
    }

    async createFile(file, essenceTable: string | null =null, essenceId: number | null =null) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            console.log(filePath, fileName)
            const newFileRow = await this.fileRepository.create({
                filePath: filePath, fileName: fileName,
                essenceTable: essenceTable, essenceId: essenceId
            })
            return newFileRow;
        } catch (e) {
            console.log(e)
            throw new HttpException('Произошла ошибка записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async edit(dto: EditFilesDto) {
        const files = await this.fileRepository.findAll({where: {id: dto.filesIds}});
        if (files.length === 0) {
            throw new HttpException('Ни одного файла не существует', HttpStatus.NOT_FOUND)
        }
        const currentTables = await this.fileRepository.sequelize.query("SELECT table_name\n" +
            "  FROM information_schema.tables\n" +
            " WHERE table_schema='public'\n" +
            "   AND table_type='BASE TABLE';")
        const currentTablesArr = currentTables[0].map(value => value["table_name"])
        if (!currentTablesArr.includes(dto.essenceTable) && dto.essenceTable !== null) {
            throw new HttpException('Такой таблицы для essenceTable не существует', HttpStatus.NOT_FOUND)
        }
        await this.fileRepository.update({...dto}, {where: {id: dto.filesIds}});
    }

    async makeFilesUnused(essenceId: number, essenceTable: string) {
        await this.fileRepository.update({essenceId: null, essenceTable: null},
            {where: {essenceId: essenceId, essenceTable: essenceTable}});
    }

    async deleteFiles(dto: DeleteFilesDto) {
        const files = await this.fileRepository.findAll({where: {id: dto.filesIds}});
        if (files.length === 0) {
            throw new HttpException('Ни одного файла не существует', HttpStatus.NOT_FOUND)
        }
        await files.forEach(file => {
            fs.unlink(path.join(file.filePath, file.fileName), (err) => {
                if (err) {
                    throw new HttpException(`Ошибка удаления файла ${file.fileName}`,
                        HttpStatus.NOT_FOUND)
                }
            })
        })
        await this.fileRepository.destroy({where: {id: dto.filesIds}});
        return {deletedFiles: files}
    }

    async deleteUnusedFiles () {
        function subtractHours(date, hours) {
                date.setHours(date.getHours() - hours);
                return date;
            }
        const files = await this.fileRepository.findAll({where: {essenceTable: null, essenceId: null,
                createdAt: {[Op.lt]: subtractHours(new Date(), 1)}}});
        if (files.length === 0) {
            throw new HttpException('Ни одного неиспользуемого файла нет', HttpStatus.NOT_FOUND)
        }
        const filesIdsForDelete = files.map(file => file.id)
        const deletedFilesOnj = await this.deleteFiles({filesIds: filesIdsForDelete})
        return deletedFilesOnj
    }

    async getFiles() {
        const files = await this.fileRepository.findAll({include: {all: true}})
        return files;
    }

    async getFilesByValues(dto: GetFilesDto) {
        const files = await this.fileRepository.findAll({where: {...dto}})
        return files;
    }
}

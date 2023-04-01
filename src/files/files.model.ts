import {Model, Table, Column} from "sequelize-typescript"
import {DataTypes} from "sequelize";


interface FileCreationAttrs {
    fileName: string;
    filePath: string;
    essenceId: number | null,
    essenceTable: string | null
}

@Table({tableName: "files"})
export class File extends Model<File, FileCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // мы не знаем (судя по описанию задачи) где будут использоваться файлы,
    // поэтому в модели нельзя предусмотреть связь с неизвестной заранее таблицей
    // (или добавить сразу все таблицы в связи, но это кажется выглядит чрезмерным)
    @Column({type: DataTypes.STRING, unique: false, allowNull: true})
    essenceTable: string;

    @Column({type: DataTypes.INTEGER, unique: false, allowNull: true})
    essenceId: number;

    @Column({type: DataTypes.STRING, unique:true, allowNull: false})
    fileName: string;

    @Column({type: DataTypes.STRING, unique:false, allowNull: false})
    filePath: string;
}

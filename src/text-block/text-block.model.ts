import {Model, Table, Column} from "sequelize-typescript"
import {DataTypes} from "sequelize";


interface TextBlockCreationAttrs {
    uniqueTitle: string;
    title: string;
    contentText: string;
    group: string;
}

@Table({tableName: "text-blocks"})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    uniqueTitle: string;

    @Column({type: DataTypes.STRING, unique: false, allowNull: false})
    title: string;

    @Column({type: DataTypes.STRING, allowNull: false})
    contentText: string;

    @Column({type: DataTypes.STRING, allowNull: false})
    group: string;
}

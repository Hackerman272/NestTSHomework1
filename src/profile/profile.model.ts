import {Model, Table, Column, BelongsToMany, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript"
import {DataTypes} from "sequelize";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";

interface ProfileCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
    middleName: string;
    phoneNumber: string;
    userId: number;
}

@Table({tableName: "profiles"})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    @ApiProperty({example: '1', description: "Уникальный id"})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Василий', description: "Имя"})
    @Column({type: DataTypes.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Васильев', description: "Фамилия"})
    @Column({type: DataTypes.STRING, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Васильевич', description: "Имя"})
    @Column({type: DataTypes.STRING, allowNull: true})
    middleName: string;

    @ApiProperty({example: '8-800-555-35-35', description: "Номер телефона"})
    @Column({type: DataTypes.STRING, allowNull: false})
    phoneNumber: string;

    @ForeignKey(() => User) // связь с user 1 к 1
    @Column({type: DataTypes.INTEGER})
    userId: number;

    @BelongsTo( () => User, { onDelete: 'cascade' })
    user: User
}

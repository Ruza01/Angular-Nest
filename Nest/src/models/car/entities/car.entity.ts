import { IsNotEmpty } from "class-validator";
import { User } from "src/models/user/entities/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "cars"})
export class Car extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    stanje: string;

    @IsNotEmpty()
    marka: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    godiste: number;

    @IsNotEmpty()
    kilometraza: number;

    @IsNotEmpty()
    karoserija: string;
    
    @IsNotEmpty()
    gorivo: string;

    @IsNotEmpty()
    kubikaza: number;

    @IsNotEmpty()
    snagaMotora: number;

    @IsNotEmpty()
    cena: number;

    @IsNotEmpty()
    fiksnaCena: string;

    @IsNotEmpty()
    zamena: string;

    @ManyToOne(type => User, user => user.userCars)
    user: User;
}
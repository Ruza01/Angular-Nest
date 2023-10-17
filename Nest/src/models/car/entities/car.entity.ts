import { IsNotEmpty } from "class-validator";
import { User } from "src/models/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "cars"})
export class Car extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stanje: string;

    @Column()
    marka: string;

    @Column()
    model: string;

    @Column()
    godiste: number;

    @Column()
    kilometraza: number;

    @Column()
    karoserija: string;
    
    @Column()
    gorivo: string;

    @Column()
    kubikaza: number;

    @Column()
    snagaMotora: number;

    @Column()
    cena: number;

    @Column()
    fiksnaCena: string;

    @Column()
    zamena: string;

    @ManyToOne(type => User, user => user.userCars)
    user: User;
}
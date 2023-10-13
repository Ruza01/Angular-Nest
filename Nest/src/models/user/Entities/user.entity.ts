import { Car } from 'src/models/car/entities/car.entity';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'users' })
export class User extends BaseEntity {
    
    //Podaci pri registraciji
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => Car, car => car.user)
    userCars: Car[];
    


}
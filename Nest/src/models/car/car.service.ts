import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";


@Injectable()
export class CarService {

    constructor(@InjectRepository(Car) private carRepository: Repository<Car>,
    private userService: UserService ){
    }

    
}
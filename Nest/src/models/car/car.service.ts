import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { carDto } from "./DTOs/car.dto";


@Injectable()
export class CarService {

    constructor(@InjectRepository(Car) private carRepository: Repository<Car>,
    private userService: UserService ){
    }

    async addEmptyCar(){
        let _car = new Car();
        _car.stanje = "";
        _car.marka = "";
        _car.model = "";
        _car.godiste = 0;
        _car.kilometraza = 0;
        _car.karoserija = "";
        _car.gorivo = "";
        _car.kubikaza = 0;
        _car.snagaMotora = 0;
        _car.cena = 0;
        _car.fiksnaCena = "";
        _car.zamena = "";
        _car.user = null;
        
        const car = this.carRepository.create(_car);
        return this.carRepository.save(car);
    }

    async getCarById(id: number){
        return Car.findOneBy({id});
    }

    async getAllCars(){
        return Car.find({ relations: ['user'], select: {
            user:{
                username: true
            }
        }});
    }

    async deleteCar(id: number){
        return Car.delete(id);
    }

    async addCar(carDto: carDto){
        try{
            const user = await this.userService.getUserById(carDto.userId);  //user koji postavlja auto
            if(user == null){
                throw new BadRequestException('user not found');
            }

            //let car = await this.getCarById(id);
            let car = new Car();
            car.stanje = carDto.stanje;
            car.marka = carDto.marka;
            car.model = carDto.model;
            car.godiste = carDto.godiste;
            car.kilometraza = carDto.kilometraza;
            car.karoserija = carDto.karoserija;
            car.gorivo = carDto.gorivo;
            car.kubikaza = carDto.kubikaza;
            car.snagaMotora = carDto.snagaMotora;
            car.cena = carDto.cena;
            car.fiksnaCena = carDto.fiksnaCena;
            car.zamena = carDto.zamena;
            car.user = user;

            //this.carRepository.update(car.id, car);
            const asCar = await this.carRepository.save(car);
            return asCar;

        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    
}
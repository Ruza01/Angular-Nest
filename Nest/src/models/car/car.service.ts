import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { carDto } from "./DTOs/car.dto";
import { carImages } from "./entities/carImages.entity";


@Injectable()
export class CarService {

    constructor(@InjectRepository(Car) private carRepository: Repository<Car>,
    private userService: UserService, @InjectRepository(carImages) private carImagesRepository: Repository<carImages>){
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
            
            const savedCar = await this.carRepository.save(car);

            // Dodavanje slika u carImages tabelu
            for (const imagePath of carDto.slike) {
                const carImage = new carImages();
                carImage.imagePath = imagePath;
                carImage.cars = savedCar;
                await this.carImagesRepository.save(carImage);
              }
            
      
            return savedCar;

        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    
}
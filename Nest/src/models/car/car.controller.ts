import { Controller, Post, Get, UseInterceptors, UploadedFiles, Param, ParseIntPipe, Res, Patch, Body, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { carDto } from './DTOs/car.dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService){
    }

    @Get('getAllCars')
    async getAllCars(){
        return this.carService.getAllCars();
    }

    @Post('addCar')
    async addCar(@Body() carDto: carDto){
        return this.carService.addCar(carDto);
    }

    @Delete('deleteCar/:id')
    async deleteCar(@Param('id', ParseIntPipe) id: number ){
        return this.carService.deleteCar(id);
    }

    @Get('getCarsByStanje/:stanje')
    async getCarsByStanje(@Param('stanje') stanje: string){
        return this.carService.getCarsByStanje(stanje);
    }


}

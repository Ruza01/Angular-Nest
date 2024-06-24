import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/Models/car.model";


const api = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})

export class CarService {
    
    constructor(private httpClient: HttpClient){

    }

    addCar(carDto: AddCarDto){
        return this.httpClient.post(`${api}/car/addCar`, carDto);
    }

    addEmptyCar(){
        return this.httpClient.post(`${api}/car/addEmpty`, {headers: {'Content-Type':'application/json'}});
    }

    getAllCars(){
        return this.httpClient.get<Car[]>(`${api}/car/getAllCars`);
    }

    getPhotosById(id: number){
        return this.httpClient.get(`${api}/car/getImage/${id}`);
    }

    uploadImages(files: File[]){
        // let formData = new FormData();
        // if(files){
        //     files.forEach(file => {
        //         formData.append('file',file,file.name);
        //     });
        // }
        // return this.httpClient.post(`${api}/car/uploadImage/${id}`, formData);
        console.log("Uso u metodu na klijentu");
    }

    
}
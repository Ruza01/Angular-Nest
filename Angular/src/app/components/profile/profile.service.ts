import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddCarDto } from "src/app/Dto/add-car.dto";

const api = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    constructor(private httpClient: HttpClient){

    }
    
    addCar(carDto: AddCarDto, carId: number){
        return this.httpClient.patch(`${api}/car/addCar/${carId}`, carDto);
    }

    uploadImages(files: File[], id: number){
        let formData = new FormData();
        if(files){
            files.forEach(file => {
                formData.append('file',file,file.name)
            });
        }
        return this.httpClient.post(`${api}/car/uploadImage/${id}`, formData);
    }

    getPhotosById(id: number){
        return this.httpClient.get(`${api}/car/getImage/${id}`);
    }

    getProfileImage(id: number | undefined){
        const requestOptions: Object = { responseType: 'blob'};
        return this.httpClient.get<any>(`${api}/profile-image/${id}`, requestOptions);
    }

    uploadImage(id: number | undefined, file: File){
        let formData = new FormData();
        formData.append('file', file, file.name);
        const requestOptions: Object = { responseType: 'blob' };
        return this.httpClient.post<any>(`${api}/uploadImage/${id}`, formData, requestOptions);
    }

}
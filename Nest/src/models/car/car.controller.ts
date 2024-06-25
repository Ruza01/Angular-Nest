import { Controller, Post, Get, UseInterceptors, UploadedFiles, Param, ParseIntPipe, Res, Patch, Body, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { carDto } from './DTOs/car.dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService){
    }

    @Post('uploadImage/:id')
    @UseInterceptors(FilesInterceptor('file',20,{
        storage: diskStorage({
            destination(req, file, callback){
                const start = req.url.indexOf("uploadImage/");
                const userId = req.url.substring(start+12);

                //Kreira folder
                const uploadPath = `./uploads/carImages/${userId}`;
                if(!existsSync(uploadPath))
                    mkdirSync(uploadPath, { recursive: true});
                callback(null, uploadPath);
            },
            filename(req, file, callback) {
                const name = file.originalname.split('.')[0];
                const newFileName = `${name}_${Date.now()}.jpg`;
                callback(null,newFileName);
            },
        }),
        fileFilter(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                return callback(null,false);
            }
            callback(null,true);
        }
    }))
    async uploadImage(@UploadedFiles() files:Array<Express.Multer.File>, @Param('id', ParseIntPipe) id: number): Promise<any>{
        const response = [];
        files.forEach(file => {
            const fileResponse = {
                originalName: file.originalname,
                filename: file.filename
            }
            response.push(fileResponse);
        })

        return response;
    }

    @Get('getImage/:id')
    async getImagesCars(@Param('id', ParseIntPipe) id: number, @Res() res){
        
        const readDir = util.promisify(fs.readdir);
        const readFile = util.promisify(fs.readFile);
        const directory = `${process.cwd()}/uploads/carImages/${id}`;
        const response = { data: []};

        try{
            let files: Promise<Buffer>[];
            if(fs.existsSync(directory)){
                
                const fileNames = await readDir(directory);
                files = fileNames.map( async (filename) => {
                    const filepath = directory + "/" + filename;
                    return readFile(filepath);
                })
            }
            else{
                files.push(readFile(`${process.cwd()}/uploads/common`));
            }

            Promise.all(files)
            .then((fileContents) => {
                response.data = fileContents;
                res.json(response);
            })
            .catch((error) => {
                res.status(400).json(response);
            });

        }catch(error){
            res.status(400).json(response);
        }
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
    async deleteCar(@Body() carDto: carDto, @Param('id', ParseIntPipe) id: number ){
        return this.carService.deleteCar(id);
    }


}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongDto } from 'src/models/song.dto';

//Moj kontroler koji ce da mi vraca pesme
@Controller('songs')
export class SongsController {

    constructor(private songService: SongsService){

    }

    @Get(/*'all'*/)         //http://localhost:3000/songs/all ovo kucam u putanju da bi mi vratio ovaj return u 9 liniji
    public getSongs(){
        return this.songService.getAll(); 
    } 

    @Get(":id")         //ako stavim ovako :id, to znaci da u getSong() u 13 liniji mora da ide parametar
    public getSong( @Param("id", ParseIntPipe ) id: number){             //dekorator moze da bude nad klasom,metodom ili u ovoj liniji nad parametrom
        return this.songService.getById(id);                                   //ovom 13 linijom se kaze ovaj parametar id, proveri ga da bude int i onda cu da ga koristim 
    }

    @Post()
    public addSong(@Body() dto: SongDto){       //ocekujem da klijent posalje dto.On ce iz tela requesta da pokupi json koji ce zaprvo da bude taj dto i na osnovu njega ce da pozove f-ju create i da prosledi taj dto
        return this.songService.create(dto);                
    }

    @Delete(":id")
    public deleteSong( @Param("id", ParseIntPipe) id: number){
        return this.songService.delete(id);
    }

    @Put(":id")
    public updateSong(@Param("id", ParseIntPipe) id:number, @Body() dto: SongDto){
        return this.songService.update(id,dto);
    }
}

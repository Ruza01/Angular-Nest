import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongDto } from 'src/models/song.dto';
import { Song, SongRating } from 'src/models/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService {
    
    constructor(@InjectRepository(Song) private songRepository: Repository<Song>){
    }

    public getAll(){
        //return this.list;
        return this.songRepository.find();
    }

    //prolazi korz listu vrlo neefikasno i uporedjivace id-jeve
    public getById(id: number){
        //return this.list.find(song => song.id === id);
        //return this.songRepository.findOne(id);
        return null;
    }

    //f-ja koja ce da napravi novu pesmu na osnovu DTO,DTO sluzi kad hocemo da posaljemo nesto sa fronta na back i to treba predstavljati neki
    //format podataka, koji ne mora nuzno da bude nuzno kao entitet
    public async create(songDto: SongDto){
        const song = this.songRepository.create(songDto); //ovo znaci da ce on da napravi entitet na osnovu dto-a
        return await this.songRepository.save(song);
    }

    public async delete(id: number){
        return await this.songRepository.delete(id);
    }

    public async update(id: number, dto: SongDto){
        return await this.songRepository.update(id,dto);
    }

}


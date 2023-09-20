import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    artist: string;

    @Column()
    viewsCount: number;

    @Column()
    link: string;
}


export enum SongRating {
    None,
    Like,
    Dislike
}
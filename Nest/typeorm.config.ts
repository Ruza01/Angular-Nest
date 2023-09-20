import { Song } from "src/models/song.entity";
import { ConnectionOptions, DataSourceOptions } from "typeorm";


export const typeOrmConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    entities: [Song],
    synchronize: true,
    database: "songs"
}
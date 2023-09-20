import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
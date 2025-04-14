import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  //Inicalmente vacio pero podemos importar varias api
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

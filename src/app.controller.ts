import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Headers('Content-Type', 'text/html') // 👈 Esto es clave
  getHello(): string {
    return this.appService.getHello() ;
  }
}

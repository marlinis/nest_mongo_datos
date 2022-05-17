import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard'; //el guardian creado en el modulo auth

import { Public } from './auth/decorators/public.decorator'; //usando el decorador creado por usuario

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(ApiKeyGuard) // protegiendo la ruta
  @Get('nuevo')
  //@SetMetadata('isPublic', true) //permitiendo hacer uso del endpoint
  @Public() //decorador en decorators aplicado
  newEndpoint() {
    return 'Soy Marlon el nuevo DESDE MONGO';
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTasks();
  }
}

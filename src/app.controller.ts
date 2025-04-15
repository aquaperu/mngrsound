import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('soun')
  async sound(){
    await this.appService.sounService()
    console.log(this.appService)
    return this.appService.sounService()
  }
}

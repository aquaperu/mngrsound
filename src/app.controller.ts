import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('soun')
  async sound(@Res() res: Response
  ){
    await this.appService.sounService()
    const filePath = './output.mp3';

    return res.sendFile(filePath);
    
  }
}

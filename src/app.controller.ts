import { Controller, Get, NotFoundException, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs'
import * as path from 'path';

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
    
    const filePath = path.join(process.cwd(),'/','dist/src', 'output.mp3');

    try {
      await fs.promises.access(filePath); // Verifica si el archivo existe
      res.sendFile(filePath);
    } catch (error) {
      throw new NotFoundException(`El archivo output.mp3 no se encontró.`);
    }
    
    
    
  }
}

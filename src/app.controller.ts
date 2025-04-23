import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { AppService, fixPathAudio } from './app.service';
import { Response } from 'express';
import * as fs from 'fs'


@Controller()
export class AppController {
  private filePath = ''; // Ruta a la carpeta src
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    this.filePath = fixPathAudio(filename);
    

    try {
      await fs.promises.access(this.filePath); // Verifica si el archivo existe
      res.sendFile(this.filePath);
    } catch (error) {
      throw new NotFoundException(`El archivo ${filename} no se encontró.`);
    }
  }

  @Get('soun')
  async sound(){
    
    
    //const filePath = path.join(process.cwd(),'/','dist/src', 'output.mp3');

    try {
      //await fs.promises.access(filePath); // Verifica si el archivo existe
      //res.sendFile(filePath);
      return this.appService.sounService()
    } catch (error) {
      throw new NotFoundException(`El archivo output.mp3 no se encontró.`);
    }
    
    
    
  }
}

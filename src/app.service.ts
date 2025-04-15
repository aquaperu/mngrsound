import { Injectable } from '@nestjs/common';
import { SoundService } from './core/services/sound.service';

@Injectable()
export class AppService {
  constructor(
    protected readonly soundService:SoundService
  ){}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async sounService(){
   await this.soundService.sintesiza()
    console.log(this.soundService)

  }
}

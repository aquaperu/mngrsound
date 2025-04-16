import { Injectable, Res } from '@nestjs/common';
import { SoundService } from './core/services/sound.service';
import { ConfigService } from '@nestjs/config';
//import { TextToSpeechClient } from '@google-cloud/text-to-speech';
const textToSpeech = require('@google-cloud/text-to-speech');
import * as fs from 'fs'
import * as path from 'path';

@Injectable()
export class AppService {
  //private client: TextToSpeechClient

  
  constructor(
   
    private readonly configService: ConfigService,
  ){
    
    
  }
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async sounService(){
    const client = new textToSpeech.TextToSpeechClient({
      credentials: {
            type: this.configService.get('TYPE'),
            client_email: this.configService.get('CLIENT_EMAIL'),
            private_key: process.env.PRIVATE_KEY,
            private_key_id: this.configService.get('PRIVATE_KEY_ID'),
            project_id: this.configService.get('PROJECT_ID'),
            client_id: this.configService.get('CLIENT_ID'),
            universe_domain: this.configService.get('UNIVERSE_DOMAIN'),
      }
    });
    
    // The text to synthesize
  const text = 'Hola , Mundo!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: 'es-ES', 
      ssmlGender: 'Female'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
  try {
    const respuesta = async()=>{
      const [myrespuesta] = await client.synthesizeSpeech(request as any)
      const filePath = path.join(process.cwd(),'/','dist/src', 'output.mp3');
      await fs.promises.writeFile(filePath, myrespuesta.audioContent, 'binary'); 

    }
    await respuesta() 
    
    
    

  } catch (error) {
    console.error("error",error)
    
  };
    
  
					
					
          
       
         
          
  

  }
}
export const fixPathAudio = (recursoAssets:string)=>{
   console.log(`Starting directory: ${process.cwd()}`);
   /*const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
   console.log(uno)*/
   //const dos = fs.readdirSync()
   return `${path.join(process.cwd(),'/','dist/src',recursoAssets)}`
}
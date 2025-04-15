import { Injectable } from '@nestjs/common';
import { SoundService } from './core/services/sound.service';
import { ConfigService } from '@nestjs/config';
//import { TextToSpeechClient } from '@google-cloud/text-to-speech';
const textToSpeech = require('@google-cloud/text-to-speech');
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
  const text = 'hello, world!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: 'en-US', 
      ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
  const [response] = await client.synthesizeSpeech(request as any);
					
					// The response's audioContent is binary
					const audioContent = response.audioContent;
          console.log(audioContent)

  }
}

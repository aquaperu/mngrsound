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
            private_key: Buffer.from("-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSTA5IwwBbxSia\nAAeXYGIqRM0hnt1m+l0XlItb0mvijspz3RTfhKpaky+5S6EbqcQESImZn5/7f53e\ns++mm310E4/lC707G36FCtO+BBO3+dODf0a5m1cL/s16/teA7kt+1TQSubFUoJCs\nyWcyRUBEDCSBddSiUGc013w7BwprZTnWvQs5us64VTfM8wavi2dUPqQEpX9vM8t8\nSx1hReDzMvinr54Cv8pAF6zn0B81tXpKeG8Sts20BTuE39O5vpFGnSmNqwWyV3Sp\nMy85TB/tjKtjs8rTpNFbhBoondopgeyD9fUEsS7vo1Gx/9GaYyG3y0nOwfDkHPO1\n8psZMquVAgMBAAECggEABw0oz3TGbs1SGrPUjVVchUlQTYfLqbfMZk2DTL1mA69B\nB5iKqiIDKk1UJNTt3oUXPwOFpaKOFTtGumBzMTV2g+1h/k6h9jjqSaC+z9jIJnuY\nhYi/gNq+FPdiwXSJGlgjLOoOOHCEiy9lGn4YWT2sNXvov3SJgDXM+B8fmcUXKtmm\n8bVSBLLDKGfDUVvWew6+PN29glFOLZtwQJ84wkPm31z3/a4DimEyuZOEy51YDZ/V\nHBJRgnm4ZvFnKVIxMXcL8Sb1f/ZCnJnEYU4wlLa5Mqj0DwAecXPoxFAZSGvShfr9\nW8ODL5sWXzoS5gD6YOUWIO6YCIgo/cd9ro3I02NpIwKBgQD+nx2D8TfMZj9hiv4f\ncDFs11fdG8uIKsgqnS8sJTpr3BG3fHQ3MH3wbH3N3Hxq6M5TEGPJ1M2RwvA+JiN/\n7PUcylXlKaJK1WKIzU+1vfQ0mGL7+rQScg1OeufG08/SMfzJT0SNWnz5N5RvCGEo\npWY+dY5ItkK2Kt6mgvQg5MYltwKBgQDTb4KrVirWnXeq6C2n09uaqD2UwFUaSNVs\nUyRm9I5EMHx86f5j69vJxsITzSj9LB9kv3oaorYqNx5p6xJ5d9VZM8VqJQmnP+8o\nMgd8LCYgpKdb40yOUVubUM/dJMvS+/IFlhlEWlBniuwYxBQo8VKCcsqNDQ7O2viV\nThVTGakZEwKBgQDlfA1DDNZIj+MSDA7L0PeK7G9RZirD2CM+XRrWA9uquNby8+Ve\nlIL9fRrJvq4YQSksLjpx/y0j8XlL2l3mf2/PegF+oE6YecfsGnd8Cu8dtDaKesNv\nWIHruNRLHD5TaSA3ZA0aBXNbvp82j2vaEXCcXKFXoYVw4CR6GM7lEqwP8wKBgGAp\nAPbHs6fz6e7ytYD0m5XVGlzCtHHF2jrv/UhNxT5CBvwQt7/eDxHPsYir8A5kuMpr\nQy9F/S9p7g0h+j8APynYn9pMif1k2HIhfsH8mkKSYAMsdy7q1YznzgG3sHN+Xm4n\n+8nYgWT2C7afxsNwLaRibLiFzcxKTnApGQ24R+29AoGBAIh03tj3sQ+DE/FJ/adl\nrnXExWz2Og/rGYXBz7C4WLdiqMD3zhroP88jsc7IabROzarmlDF50076Pyyx+2OZ\nh/VUkmK0JSEDpgWN1bXyohLXf3YOeivaghS+w3IDZLg6huWlhRknGOH/NnbwJFKI\nFafEtHcmk32GdyQyt/4xfYlw\n-----END PRIVATE KEY-----\n", 'base64').toString('utf8'),
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

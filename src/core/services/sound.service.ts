import { FileValidator, Inject, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import * as fs from 'fs'
import * as path from 'path'

import { CoreAutenticationService } from './auth.service';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

@Injectable()
export class SoundService extends CoreAutenticationService {

    public async sintesiza(){
        // The text to synthesize
        const text = 'hello, world!';

        // Construct the request
        const request = {
    
            input: {text: text},
            // Select the language and SSML voice gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            // select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
        };
        const [response] = await this.sound.synthesizeSpeech(request as any);
	    // The response's audioContent is binary
	    const audioContent = response.audioContent;
        console.log(audioContent)
    }
}
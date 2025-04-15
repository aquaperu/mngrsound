import { Inject, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { CoreConfig } from '../type';
import { EFOLDERSIDS } from '../core.module';


@Injectable()
export class CoreAutenticationService{
  public sound
  constructor(
    @Inject(EFOLDERSIDS.CONFIG) private config:CoreConfig ,
  ) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: this.config.client_email,
        private_key: this.config.private_key,
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/documents.readonly',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/cloud-platform.read-only'
       
      ],
    });
    this.sound = google.texttospeech({ version: 'v1', auth });
    
    
    
    
  }
}
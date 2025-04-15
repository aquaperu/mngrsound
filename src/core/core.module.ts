import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import { CoreAutenticationService } from './services/auth.service';
import { CoreConfig } from './type';

export const enum EFOLDERSIDS {
    CONFIG = "CONFIG",
    FOLDERBASEID = "FOLDERBASEID",
    FOLDERLOGOSID = "FOLDERLOGOSID", 
    FOLDERARCHIVOSID = "FOLDERARCHIVOSID",
    CONFIG_SHEETID_FILE="CONFIG_SHEETID_FILE"
  
  }

@Module({
    imports: [HttpModule],
})
export class CoreModule {
   /**
   * @description registra los servicios que ofrece el modulo, para que esten disponibles en el modulo cliente
   * @param googleDriveConfig your config file/all config fields
   * @param googleDriveFolderId your Google Drive folder id
   */
    static register(
        coreConfig: CoreConfig,
        //googleDriveBaseFolderId: string,
        //googleDriveLogosFolderId: string,
        //googleDriveArchivosFolderId: string,
        //googleSpreadsheetId:string,
        //googleDriveBaseFolderId: string,//carpeta base en donde se lojara todos los archivos de los usuarios
        //googleDriveLogosFolderId: string,//carpeta donde se alojará el logo del usuario
        //googleDriveArchivosFolderId: string,//carpeta donde se alojara toda la gestion documentaria del usuario
        //googleSpreadsheetId:string,
      ): DynamicModule {
        return {
          module: CoreModule,
          global: true,
          providers: [
            //los servicios que ofrece el modulo
            CoreAutenticationService,
            
            { provide: EFOLDERSIDS.CONFIG, useValue: CoreConfig },
           
          ],
          exports: [
            CoreAutenticationService,
            
    
           
          ],
        };
      }
}

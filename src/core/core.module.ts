import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import { CoreAutenticationService } from './services/auth.service';
import { CoreConfig } from './type';
import { SoundService } from './services/sound.service';

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
      ): DynamicModule {
        return {
          module: CoreModule,
          global: true,
          providers: [
            //los servicios que ofrece el modulo
            CoreAutenticationService,
            SoundService,
            { provide: EFOLDERSIDS.CONFIG, useValue: coreConfig },
          ],
          exports: [
            CoreAutenticationService,
            SoundService,
            { provide: EFOLDERSIDS.CONFIG, useValue: coreConfig },
          ],
        };
      }
}

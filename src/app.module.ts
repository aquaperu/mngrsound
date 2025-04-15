import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { configLoader } from 'config-loader';
import { envSchema } from 'env-schema';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configLoader],
      validationSchema:envSchema
    }),
    HttpModule,
    ConfigModule.forRoot(),
    CoreModule.register({
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2862096347.
      type: process.env.TYPE,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2483550417.
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3193813832.
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2800010317.
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
      

    }),
  ],
  controllers: [AppController],
  providers: [AppService,ConfigModule],
})
export class AppModule {}
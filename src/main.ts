import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )
  const writelist = [
    "*"
  ]
  const corsOptions: CorsOptions = {
    origin: function(origin,callback){
      if(writelist.indexOf(origin) !== -1 || !origin ){
        callback(null,true);
      }else{
        callback(new Error("not allow by corsw"))
      }
    },
    methods: '*',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);
  
  useContainer(app.select(AppModule), {fallbackOnErrors: true}); 
  await app.listen(process.env.PORT || 3000 || 8000,()=>{
    const usoActual = obtenerUsoMemoria();
    console.log('Uso de memoria actual:');
    console.log(usoActual)
    console.log(`Launching NestJS app on port ${process.env.PORT}, URL: http://0.0.0.0:${process.env.PORT}`)
  });
}
bootstrap();

function obtenerUsoMemoria() {
  const memoria = process.memoryUsage();

  return {
    rss: bytesAHumanos(memoria.rss),       // Resident Set Size - Memoria total asignada al proceso (incluyendo código y datos).
    heapTotal: bytesAHumanos(memoria.heapTotal), // Memoria total reservada para el heap de JavaScript.
    heapUsed: bytesAHumanos(memoria.heapUsed),  // Memoria actualmente utilizada dentro del heap de JavaScript.
    external: bytesAHumanos(memoria.external),   // Memoria utilizada por objetos externos a JavaScript (como buffers).
  };
}

function bytesAHumanos(bytes: number): string {
  const unidades = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (bytes >= 1024 && i < unidades.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${unidades[i]}`;
}
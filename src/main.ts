import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'..','public'),{prefix:'/public'});
  
  app.enableCors({
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT,DELETE, OPTIONS',
  
  
  credentials: true,
})
 
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(3000);
}
bootstrap();


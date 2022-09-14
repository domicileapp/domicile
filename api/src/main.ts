import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

import { writeFileSync } from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const port = configService.get<number>('PORT')

  app.enableCors({ origin: '*' })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //If set to true validator will strip validated object of any properties that do not have any decorators.
      transform: true, //The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes. To enable auto-transformation, set transform to true.
      forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an error
      transformOptions: {
        enableImplicitConversion: true, //If set to true class-transformer will attempt conversion based on TS reflected type
      },
      enableDebugMessages: true,
    })
  )

  const config = new DocumentBuilder() //SWAGGER
    .setTitle('Domicile API')
    .setDescription('Domicile API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  writeFileSync('./swagger-spec.json', JSON.stringify(document))
  SwaggerModule.setup('docs', app, document) //localhost:3000/docs | localhost:8080/docs to get info of the API

  await app.listen(port || 4000)
}
bootstrap()

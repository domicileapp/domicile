import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import fs from 'fs'
import path from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  })
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors({ origin: '*' })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Domicile')
    .setDescription(
      'An application to help those with executive dysfunction manage household tasks, inventories, and life.',
    )
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  fs.writeFileSync(
    path.join(__dirname, '../../src/config/schemas/openapi-spec.json'),
    JSON.stringify(document, null, 4),
  )
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()

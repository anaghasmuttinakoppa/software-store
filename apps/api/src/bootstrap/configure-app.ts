import { INestApplication } from '@nestjs/common';

export function configureApp(app: INestApplication): string {
  const prefix = process.env.API_PREFIX ?? 'api/v1';
  app.setGlobalPrefix(prefix);
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });
  return prefix;
}

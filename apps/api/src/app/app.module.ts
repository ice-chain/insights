import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from '../instagram/instagram.module';
import { UserModule } from '../user/user.module';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client', 'dist'),
      exclude: ['api/*'],
    }),
    ConfigModule.forRoot(),
    InstagramModule,
    UserModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

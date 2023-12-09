import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from '../instagram/instagram.module';
import { UserModule } from '../user/user.module';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InstagramModule,
    UserModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

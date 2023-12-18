import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
  ],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}

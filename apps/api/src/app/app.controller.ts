import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '../clerk/clerk.guard';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

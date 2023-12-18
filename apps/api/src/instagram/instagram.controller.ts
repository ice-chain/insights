import { Controller, Get, Post, Body, Param, UseGuards, ForbiddenException, Query, Headers } from '@nestjs/common';
import { SignedOutAuthObject } from '@clerk/clerk-sdk-node';
import { InstagramService } from './instagram.service';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { Auth, AuthGuard } from '../clerk/clerk.guard';

@UseGuards(AuthGuard)
@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post()
  create(@Auth() auth: SignedOutAuthObject, @Body() createInstagramDto: CreateInstagramDto) {
    const { userId } = createInstagramDto;

    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.create(createInstagramDto);
  }

  @Get()
  findAll(@Auth() auth: SignedOutAuthObject, @Query('userId') userId: string) {
    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Auth() auth: SignedOutAuthObject, @Query('userId') userId: string) {
    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.findOne(id);
  }

  @Get(':id/overview')
  findInsightsOverview(
    @Auth() auth: SignedOutAuthObject,
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('period') period: { since: number, until: number },
    @Headers('accept-language') locale: string,
  ) {
    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.findInsightsOverview({ period, userId, id, locale });
  }


  @Get(':id/interactions')
  findInsightsInteractions(
    @Auth() auth: SignedOutAuthObject,
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('period') period: { since: number, until: number },
    @Headers('accept-language') locale: string,
  ) {
    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.findInsightsInteractions({ period, userId, id, locale });
  }


  @Get(':id/online-followers')
  findInsightsFollowersOnline(
    @Auth() auth: SignedOutAuthObject,
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('period') period: { since: number, until: number },
    @Headers('accept-language') locale: string,
  ) {
    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.findInsightsFollowersOnline({ period, userId, id, locale });
  }

  @Get(':id/followers-count')
  findInsightsFollowersCount(
    @Auth() auth: SignedOutAuthObject,
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Query('period') period: { since: number, until: number },
    @Headers('accept-language') locale: string,
  ) {
    if (userId !== auth.userId) {
      return new ForbiddenException();
    }

    return this.instagramService.findInsightsFollowersCount({ period, userId, id, locale });
  }
}

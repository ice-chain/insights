import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, Query } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { Auth, AuthGuard } from 'src/clerk/clerk.guard';
import { SignedOutAuthObject } from '@clerk/clerk-sdk-node';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstagramDto: UpdateInstagramDto) {
    return this.instagramService.update(+id, updateInstagramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instagramService.remove(+id);
  }
}

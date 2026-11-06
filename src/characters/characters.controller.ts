import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.charactersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.charactersService.update(id, body);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: any) {
    return this.charactersService.patch(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.charactersService.delete(id);
  }
}
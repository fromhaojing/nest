import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from './config';

@Controller('book')
export class BookController {

  @Inject()
  private readonly bookService: BookService

  @Get('list')
  async list() {
    return this.bookService.list();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findById(id);
  }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', imageUploadOptions))
  async uploadFile(@UploadedFile() file: File) {
    console.log(file);

  }

}

import { Body, Controller, Get, Inject, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { LargeFileShardingUploadService } from './large-file-sharding-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { readdirSync, createReadStream, createWriteStream, statSync, rm } from "fs";

export type BodyType = { name: string }

@Controller('large-file-sharding-upload')
export class LargeFileShardingUploadController {
  @Inject()
  private readonly largeFileShardingUploadService: LargeFileShardingUploadService

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;

    const files = readdirSync(chunkDir);

    let startPos = 0;
    let count = 0;
    files.map(file => {
      const filePath = chunkDir + '/' + file;
      const stream = createReadStream(filePath);
      stream.pipe(createWriteStream('uploads/' + name, {
        start: startPos
      })).on('finish', () => {
        count++;
        if (count === files.length) {
          rm(chunkDir, { recursive: true }, () => { })
        }
      })

      startPos += statSync(filePath).size;
    })
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, { dest: 'uploads' }))
  uploadedFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: BodyType) {
    this.largeFileShardingUploadService.handleFile(body, files)
  }

}

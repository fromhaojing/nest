import { Injectable } from '@nestjs/common';
import { BodyType } from './large-file-sharding-upload.controller';
import { existsSync, mkdirSync, cpSync, rmSync } from 'fs';

@Injectable()
export class LargeFileShardingUploadService {

  handleFile(body: BodyType, files: Array<Express.Multer.File>) {
    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;
    mkdirSync(chunkDir, { recursive: true });
    cpSync(files[0].path, chunkDir + '/' + body.name);
    rmSync(files[0].path);
  }
}

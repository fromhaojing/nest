import { Module } from '@nestjs/common';
import { LargeFileShardingUploadService } from './large-file-sharding-upload.service';
import { LargeFileShardingUploadController } from './large-file-sharding-upload.controller';

@Module({
  controllers: [LargeFileShardingUploadController],
  providers: [LargeFileShardingUploadService],
})
export class LargeFileShardingUploadModule {}

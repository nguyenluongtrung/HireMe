import { Module } from '@nestjs/common'

import { MediaController } from 'src/routes/media/media.controller'
import { MediaService } from 'src/routes/media/media.service'
import { S3Service } from 'src/shared/services/s3.service'

@Module({
  providers: [MediaService, S3Service],
  controllers: [MediaController],
})

export class MediaModule {}
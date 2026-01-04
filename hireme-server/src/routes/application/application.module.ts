import { Module } from '@nestjs/common';

import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationRepo } from './application.repo';

@Module({
  providers: [ApplicationService, ApplicationRepo],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationModule {}

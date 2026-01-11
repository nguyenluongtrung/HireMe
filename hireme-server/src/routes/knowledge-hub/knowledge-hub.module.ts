import { Module } from '@nestjs/common';

import { KnowledgeHubService } from './knowledge-hub.service';
import { KnowledgeHubController } from './knowledge-hub.controller';
import { KnowledgeHubRepo } from './knowledge-hub.repo';

@Module({
    providers: [KnowledgeHubService, KnowledgeHubRepo],
    controllers: [KnowledgeHubController],
})
export class KnowledgeHubModule {}

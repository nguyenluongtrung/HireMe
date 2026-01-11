import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { SharedModule } from "./shared/shared.module"
import { AuthModule } from "./routes/auth/auth.module"
import { RoleModule } from "./routes/role/role.module"
import { MediaModule } from "./routes/media/media.module"
import { ApplicationModule } from './routes/application/application.module';
import { KnowledgeHubModule } from './routes/knowledge-hub/knowledge-hub.module';

@Module({
  imports: [SharedModule, AuthModule, RoleModule, MediaModule, ApplicationModule, KnowledgeHubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

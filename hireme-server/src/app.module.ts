import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { SharedModule } from "./shared/shared.module"
import { AuthModule } from "./routes/auth/auth.module"
import { RoleModule } from "./routes/role/role.module"
import { MediaModule } from "./routes/media/media.module"

@Module({
  imports: [SharedModule, AuthModule, RoleModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

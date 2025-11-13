import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommunitiesModule } from './communities/communities.module';

@Module({
  imports: [PrismaModule, CommunitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

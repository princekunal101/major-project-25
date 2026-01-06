import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
 
@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
      cache: true,
      load: [config],
    }),
    
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

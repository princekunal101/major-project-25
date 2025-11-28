import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  CreatePostSchema } from './schemas/createPost.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'CreatePost', schema: CreatePostSchema}
  ])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}

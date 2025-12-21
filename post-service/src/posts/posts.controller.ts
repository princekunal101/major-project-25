import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GeneratePostDto } from './dto/generate-post.dto';
import { ContentType } from './schemas/posts.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // @Get()
  // async getAllPosts():Promise<CreatePost[]>{
  //     return this.postsService.findAllPosts();
  // }

  // GET All Communities Entry Point
  @Get()
  async getAllPosts(
    @Query('cursor') cursor?: string,
    @Query('userId') userId?: string,
    @Query('communityId') communityId?: string,
    @Query('tags') tags?: string[],
    @Query('contentType') contentType?: ContentType,
    @Query('title') postTitle?: string,
  ) {
    const itemLength = 6;
    const items = await this.postsService.getAllPostsCursor(
      cursor,
      itemLength,
      userId,
      communityId,
      tags,
      contentType,
      postTitle,
    );
    return {
      items,
      nextCursor: items.length ? items[items.length - 1].id : null,
      hasMore: items.length === itemLength,
    };
  }

  // POST Uploading the post
  @Post('upload-post/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Param('id') userId: string,
    @Body() createPost: GeneratePostDto,
  ) {
    return this.postsService.createPost(userId, createPost);
  }

  @Get(':id')
  async getPosts(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  // PUT update the post
  @Put('update-post/:id/:postId')
  async updatePost(
    @Param('id') userId: string,
    @Param('postId') postId: string,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postsService.updatePost(userId, postId, updatePost);
  }

  @Delete('delete-post/:id/:postId')
  async deletePost(
    @Param('id') userId: string,
    @Param('postId') postId: string,
  ) {
    return this.postsService.deleteById(userId, postId);
  }

  @MessagePattern({ cmd: 'verify-postId' })
  async verifyPostId(data: { postId: string }) {
    return this.postsService.handleIsPostIdExist(data.postId);
  }

  @MessagePattern({ cmd: 'update-like-count' })
  async handleLikeUpdate(data: {
    postId: string;
    userId: string;
    action: 'increment' | 'decrement' | 'none';
  }) {
    return this.postsService.handleLikeUpdates(
      data.postId,
      data.userId,
      data.action,
    );
  }
  @MessagePattern({ cmd: 'update-comment-count' })
  async handleCommentCreated(data: {
    postId: string;
    userId: string;
    action: 'increment' | 'decrement' | 'none';
  }) {
    return this.postsService.handleCommentCreated(
      data.postId,
      data.userId,
      data.action,
    );
  }
  @MessagePattern({ cmd: 'update-share-count' })
  async handleShareCreated(data: {
    postId: string;
    userId: string;
    action: 'increment' | 'decrement' | 'none';
  }) {
    return this.postsService.handleShareCreated(
      data.postId,
      data.userId,
      data.action,
    );
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost } from './schemas/createPost.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService:PostsService ){}

    @Get()
    async getAllPosts():Promise<CreatePost[]>{
        return this.postsService.findAllPosts();
    }

    @Post('upload-new-post')
    async createPost(
        @Body()
        createPost:CreatePostsDto
    ):
    Promise<CreatePost>{
        return this.postsService.createPost(createPost);
    }

    @Get(':id')
    async getPosts(
        @Param('id') id:string
    ):Promise<CreatePost>{
        return this.postsService.findById(id);
    }


    @Put(':id')
    async updatePost(
        @Param('id') id:string,
        @Body()
        updatePost:UpdatePostsDto,
    ):Promise<CreatePost>{
        return this.postsService.updateById(id, updatePost);
    }


    @Delete(':id')
    async deletePost(
        @Param('id') id:string
    ):Promise<CreatePost>{
        return this.postsService.deleteById(id);
    }

}



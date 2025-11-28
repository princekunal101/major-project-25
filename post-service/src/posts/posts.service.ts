import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePost } from './schemas/createPost.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(CreatePost.name)
         private createPostModel:mongoose.Model<CreatePost>
    ){}

    async findAllPosts():Promise<CreatePost[]>{
        const posts = await this.createPostModel.find()
        return posts;
    }

    async createPost(createPost:CreatePost):Promise<CreatePost>{
        const newPost = new this.createPostModel(createPost);
        return newPost.save();
    }

    async findById(id:string):Promise<CreatePost>{
        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException("Please enter a valid id");
        }

        const post = await this.createPostModel.findById(id).orFail();

        if(!post){
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async updateById(id:string, updatePost:CreatePost):Promise<CreatePost>{
        return await this.createPostModel.findByIdAndUpdate(id, updatePost, {
            new:true,
            runValidators:true
        }).orFail();
    }


    async deleteById(id:string):Promise<CreatePost>{
        return await this.createPostModel.findByIdAndDelete(id).orFail();
    }
}

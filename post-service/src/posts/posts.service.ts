import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentType, GeneratePost } from './schemas/posts.schema';
import * as mongoose from 'mongoose';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { GeneratePostDto } from './dto/generate-post.dto';
import { time } from 'console';
import { title } from 'process';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('COMMUNITY_SERVICE') private client: ClientProxy,
    @InjectModel(GeneratePost.name)
    private createPostModel: mongoose.Model<GeneratePost>,
  ) {}

  // TODO: get all the post
  //   async findAllPosts(): Promise<CreatePost[]> {
  //     const posts = await this.createPostModel.find();
  //     return posts;
  //   }

  // Get All Posts with cursor
  async getAllPostsCursor(
    cursor?: string,
    pageSize: number = 5,
    userId?: string,
    communityId?: string,
    tags?: string[],
    content_type?: ContentType,
    postTitle?: string,
  ) {
    const filter: any = {};

    if (postTitle)
      filter['content.title'] = { $regex: postTitle, $options: 'i' };
    if (cursor) filter._id = { $gt: cursor };
    if (userId) filter.postedBy = userId;
    if (communityId) filter.communityId = communityId;
    if (content_type) filter.content_type = content_type;
    if (tags) filter['content.tags'] = { $in: tags };

    return await this.createPostModel
      .find(filter)
      .sort({ _id: -1 })
      .limit(pageSize)
      .exec();
  }

  // TODO: creating a post method
  async createPost(userId: string, createPost: GeneratePostDto) {
    const { communityId } = createPost;

    // TODO: verify user can post or not
    const isVerified = await this.verifyCanPost(userId, communityId);

    if (!isVerified) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // TODO: store the post
    const newPost = await this.createPostModel.create({
      postedBy: userId,
      communityId: createPost.communityId,
      content: createPost.content,
      content_type: createPost.content_type,
    });
    // newPost.save();

    if (!newPost) {
      throw new InternalServerErrorException('Post not created');
    }

    return {
      message: 'Post has created!',
    };
  }

  // TODO: find by id
  async findById(postId: string) {
    const isValidId = mongoose.isValidObjectId(postId);
    if (!isValidId) {
      throw new BadRequestException('Something went wrong');
    }

    const post = await this.createPostModel.findById(postId).orFail();

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  // TODO: updating the a old post
  async updatePost(
    postedBy: string,
    postId: string,
    updatePost: UpdatePostDto,
  ) {
    // TODO: verify the postid is valid or not
    const isValidId = mongoose.isValidObjectId(postId);
    if (!isValidId) {
      throw new BadRequestException('Something went wrong');
    }

    const isUpdated = await this.createPostModel.findOneAndUpdate(
      { _id: postId, postedBy },
      {
        $set: {
          'content.title': updatePost.content.title,
          'content.subTitle': updatePost.content.subTitle,
          'content.body': updatePost.content.body,
          'content.tags': updatePost.content.tags,
          'content.summary': updatePost.content.summary,
          'content.summaryTitle': updatePost.content.summaryTitle,
          content_type: updatePost.content_type,
        },
      },
      { new: true, runValidators: true },
    );

    if (!isUpdated) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return {
      message: 'Post is updated!',
    };
  }

  // TODO: community users entry with TCP
  private async verifyCanPost(userId: string, communityId: string) {
    // call to auth-service and res back
    try {
      const res = await this.client
        .send<{
          isValid: boolean;
        }>(
          { cmd: 'verify-community' },
          { userId: userId, communityId: communityId },
        )
        .toPromise();

      if (!res) {
        throw new InternalServerErrorException('TCP: Someting went wrong');
      }

      return res.isValid ? true : false;
    } catch (err) {
      throw new InternalServerErrorException('TCP Connection is failed');
    }
  }

  // TODO: deleting the post method
  async deleteById(postedBy: string, postId: string) {
    // TODO: verify the postid is valid or not
    const isValidId = mongoose.isValidObjectId(postId);
    if (!isValidId) {
      throw new BadRequestException('Something went wrong');
    }

    const isDeleted = await this.createPostModel.findOneAndDelete({
      _id: postId,
      postedBy,
    });

    if (!isDeleted) {
      throw new UnauthorizedException('Wrong credentials');
    }
  }

  // TODO: Cheking is PostId exist or not

  async handleIsPostIdExist(postId: string) {
    const isPostId = await this.createPostModel.findById(postId);
    return { isPostId: isPostId ? true : false };
  }

  // TODO: Incementing the like count with Kafka
  async handleLikeUpdates(
    postId: string,
    userId: string,
    action: 'increment' | 'decrement' | 'none',
  ) {
    let update: any = {};

    if (action === 'increment') {
      update.$inc = { likeCount: 1 };
    } else if (action === 'decrement') {
      update.$inc = { likeCount: -1 };
    } else {
      update = {};
    }

    const likeCounted = await this.createPostModel.findByIdAndUpdate(
      postId,
      update,
    );

    return { isLikeCounted: likeCounted ? true : false };
  }

  // TODO: Incementing the comment count with Kafka
  async handleCommentCreated(
    postId: string,
    userId: string,
    action: 'increment' | 'decrement' | 'none',
  ) {
    let update: any = {};

    if (action === 'increment') {
      update.$inc = { commentCount: 1 };
    } else if (action === 'decrement') {
      update.$inc = { commentCount: -1 };
    } else {
      update = {};
    }

    const commentCounted = await this.createPostModel.findByIdAndUpdate(
      postId,
      update,
    );

    return { isCommentCounted: commentCounted ? true : false };
  }
  // TODO: Incementing the comment count with Kafka
  async handleShareCreated(
    postId: string,
    userId: string,
    action: 'increment' | 'decrement' | 'none',
  ) {
    let update: any = {};

    if (action === 'increment') {
      update.$inc = { shareCount: 1 };
    } else if (action === 'decrement') {
      update.$inc = { shareCount: -1 };
    } else {
      update = {};
    }

    const shareCounted = await this.createPostModel.findByIdAndUpdate(
      postId,
      update,
    );
    return { isShareCounted: shareCounted ? true : false };
  }
}

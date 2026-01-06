import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { React } from './schemas/react.schema';
import { Comment } from './schemas/comments.schema';
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Reply } from './schemas/reply.schema';
import { CommentsReact } from './schemas/commentsReact.schema';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReactDto } from './dto/create-react.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { CreateCommentsReactDto } from './dto/create-comments-react.dto';
import { CreateReplyReactDto } from './dto/create-reply-react.dto';
@Injectable()
export class InteractionsService {
  constructor(
    // @Inject('KAFKA_CLIENT')
    // private kafkaClient: ClientProxy,

    @Inject('POST_SERVICE') private client: ClientProxy,

    @InjectModel(React.name)
    private reactModel: mongoose.Model<React>,
    @InjectModel(Comment.name)
    private commentModel: mongoose.Model<Comment>,

    @InjectModel(Reply.name)
    private replyModel: mongoose.Model<Reply>,

    @InjectModel(CommentsReact.name)
    private commentsReactModel: mongoose.Model<CommentsReact>,
  ) {}

  async findAllReacts(): Promise<React[]> {
    const reacts = await this.reactModel.find();
    return reacts;
  }

  // TODO: creating ract method
  async createReact(userId: string, react: CreateReactDto) {
    const isValidId = mongoose.isValidObjectId(react.postId);
    if (!isValidId) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isPostId = await this.isPostIdExist(react.postId);

    if (!isPostId) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const newReact = await this.reactModel.updateOne(
      { userId, postId: react.postId },
      {
        userId: userId,
        postId: react.postId,
        reactType: react.reactType,
      },
      {
        upsert: true,
      },
    );

    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isLikeCounted = await this.addLikeCount(
      react.postId,
      userId,
      newReact.upsertedCount > 0 ? 'increment' : 'none',
    );

    if (!isLikeCounted) {
      throw new InternalServerErrorException();
    }
  }

  // TODO:
  //   async findById(id: string): Promise<React> {
  //     const isValidId = mongoose.isValidObjectId(id);
  //     if (!isValidId) {
  //       throw new BadRequestException('Please enter a valid id');
  //     }
  //     const react = await this.reactModel.findById(id).orFail();

  //     if (!react) {
  //       throw new NotFoundException('React not found');
  //     }

  //     return react;
  //   }

  // async updateById(id: string, updateReact: React): Promise<React> {
  //   return await this.reactModel
  //     .findByIdAndUpdate(id, updateReact, {
  //       new: true,
  //       runValidators: true,
  //     })
  //     .orFail();
  // }

  // TODO: delete the react mothod
  async deleteReact(userId: string, postId: string) {
    const newReact = await this.reactModel.findOneAndDelete({ userId, postId });
    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isLikeCounted = await this.addLikeCount(
      newReact.postId,
      userId,
      'decrement',
    );

    if (!isLikeCounted) {
      throw new InternalServerErrorException();
    }
  }

  // comment service methods
  async findAllComments(): Promise<Comment[]> {
    const comments = await this.commentModel.find();
    return comments;
  }

  // TODO: creating comment
  async createComment(userId: string, comment: CreateCommentDto) {
    const isValidId = mongoose.isValidObjectId(comment.postId);
    if (!isValidId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isPostId = await this.isPostIdExist(comment.postId);

    if (!isPostId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const newComment = await this.commentModel.create({
      userId,
      postId: comment.postId,
      data: comment.data,
    });

    if (!newComment) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isCommentCounted = await this.addCommentCount(
      comment.postId,
      userId,
      'increment',
    );

    if (!isCommentCounted) {
      throw new InternalServerErrorException();
    }
  }

  // find the comment by its id
  async findCommentById(id: string): Promise<Comment> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const comment = await this.commentModel.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  // find the all comments by post Id
  async getPostCommentByPostId(
    cursor?: string,
    pageSize: number = 5,
    postId?: string,
  ) {
    const isValidId = mongoose.isValidObjectId(postId);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const filter: any = {};
    if (cursor) filter._id = { $gt: cursor };
    if (postId) filter.postId = postId;

    const comment = await this.commentModel
      .find(filter)
      .sort({ _id: -1 })
      .limit(pageSize)
      .exec();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  // update comment method
  async updateComment(
    userId: string,
    commantId: string,
    updateComment: CreateCommentDto,
  ) {
    const isValidPostId = mongoose.isValidObjectId(updateComment.postId);
    const isValidCommentId = mongoose.isValidObjectId(commantId);
    if (!isValidPostId || !isValidCommentId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const updatedReply = await this.commentModel.findOneAndUpdate(
      { _id: commantId, userId, postId: updateComment.postId },
      { data: updateComment.data },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedReply) {
      throw new UnauthorizedException('Wrong credentials');
    }
  }

  // TODO: delete comment method
  async deleteComment(userId: string, commentId: string) {
    const isValidId = mongoose.isValidObjectId(commentId);
    if (!isValidId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const newReact = await this.commentModel.findOneAndDelete({
      _id: commentId,
      userId,
    });
    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isCommentCounted = await this.addCommentCount(
      newReact.postId,
      userId,
      'decrement',
    );

    if (!isCommentCounted) {
      throw new InternalServerErrorException();
    }
  }

  // reply service methods
  // async findAllReplies(): Promise<Reply[]> {
  //   const replies = await this.replyModel.find();
  //   return replies;
  // }

  // TODO: create reply method
  async createReply(userId: string, reply: CreateReplyDto) {
    const isValidPostId = mongoose.isValidObjectId(reply.postId);
    const isValidCommentId = mongoose.isValidObjectId(reply.commentId);
    if (!isValidPostId || !isValidCommentId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isPostId = await this.isPostIdExist(reply.postId);

    if (!isPostId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // TODO: check the correct commentId or exist or not
    const isCommentId = await this.commentModel.findById(reply.commentId);
    if (!isCommentId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const newReply = await this.replyModel.create({
      userId,
      postId: reply.postId,
      commentId: reply.commentId,
      data: reply.data,
    });

    if (!newReply) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isCommentCounted = await this.addCommentCount(
      reply.postId,
      userId,
      'increment',
    );
    const isReplyCounted = await this.commentModel.findOneAndUpdate(
      { _id: reply.commentId, postId: reply.postId },
      { $inc: { replyCount: 1 } },
    );

    if (!isCommentCounted || !isReplyCounted) {
      throw new InternalServerErrorException();
    }
  }

  // async findReplyById(id: string): Promise<Reply> {
  //   const isValidId = mongoose.isValidObjectId(id);
  //   if (!isValidId) {
  //     throw new BadRequestException('Please enter a valid id.');
  //   }
  //   const reply = await this.replyModel.findById(id);

  //   if (!reply) {
  //     throw new NotFoundException('Reply not found');
  //   }
  //   return reply;
  // }

  // TODO: Update reply method
  async updateReply(
    userId: string,
    replyId: string,
    updateReply: UpdateReplyDto,
  ) {
    const isValidPostId = mongoose.isValidObjectId(updateReply.postId);
    const isValidCommentId = mongoose.isValidObjectId(replyId);
    if (!isValidPostId || !isValidCommentId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const updatedReply = await this.replyModel.findOneAndUpdate(
      { _id: replyId, userId },
      { data: updateReply.data },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedReply) {
      throw new UnauthorizedException('Wrong credentials');
    }
  }

  // find the all comments by post Id
  async getReplyCommentsByCommentId(
    cursor?: string,
    pageSize: number = 5,
    commentId?: string,
  ) {
    const isValidId = mongoose.isValidObjectId(commentId);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const filter: any = {};
    if (cursor) filter._id = { $gt: cursor };
    if (commentId) filter.commentId = commentId;

    const commentReply = await this.replyModel
      .find(filter)
      .sort({ _id: -1 })
      .limit(pageSize)
      .exec();

    if (!commentReply) {
      throw new NotFoundException('Comment not found');
    }
    return commentReply;
  }

  // TODO: delete reply method
  async deleteReply(userId: string, replyId: string) {
    const isValidCommentId = mongoose.isValidObjectId(replyId);
    if (!isValidCommentId) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isDeletedReply = await this.replyModel.findOneAndDelete({
      _id: replyId,
      userId,
    });

    if (!isDeletedReply) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isCommentCounted = await this.addCommentCount(
      isDeletedReply.postId,
      userId,
      'decrement',
    );
    const isReplyCounted = await this.commentModel.findOneAndUpdate(
      { _id: isDeletedReply.commentId, postId: isDeletedReply.postId },
      { $inc: { replyCount: -1 } },
    );

    if (!isCommentCounted || !isReplyCounted) {
      throw new InternalServerErrorException();
    }
  }

  // comments react service methods
  // async findAllCommentsReacts(): Promise<CommentsReact[]> {
  //   const commentsReacts = await this.commentsReactModel.find();
  //   return commentsReacts;
  // }

  // Create comment React method
  async createCommentReact(
    userId: string,
    commentReact: CreateCommentsReactDto,
  ) {
    const isValidPostId = mongoose.isValidObjectId(commentReact.postId);
    const isValidCommentId = mongoose.isValidObjectId(commentReact.commentId);
    if (!isValidPostId || !isValidCommentId) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isPostId = await this.isPostIdExist(commentReact.postId);

    if (!isPostId) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const newReact = await this.commentsReactModel.updateOne(
      {
        userId,
        postId: commentReact.postId,
        commentId: commentReact.commentId,
      },
      {
        userId: userId,
        postId: commentReact.postId,
        commentId: commentReact.commentId,
        reactType: commentReact.reactType,
      },
      {
        upsert: true,
      },
    );

    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isLikeCounted = await this.commentModel.findOneAndUpdate(
      { _id: commentReact.commentId },
      { $inc: { likeCount: newReact.upsertedCount > 0 ? 1 : 0 } },
    );

    if (!isLikeCounted) {
      throw new InternalServerErrorException();
    }
  }

  // Create Reply react method
  async createReplyReact(userId: string, commentReact: CreateReplyReactDto) {
    const isValidId = mongoose.isValidObjectId(commentReact.postId);
    if (!isValidId) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isPostId = await this.isPostIdExist(commentReact.postId);

    if (!isPostId) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const newReact = await this.commentsReactModel.updateOne(
      {
        userId,
        postId: commentReact.postId,
        commentId: commentReact.replyId,
      },
      {
        userId: userId,
        postId: commentReact.postId,
        commentId: commentReact.replyId,
        reactType: commentReact.reactType,
      },
      {
        upsert: true,
      },
    );

    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isLikeCounted = await this.replyModel.findOneAndUpdate(
      { _id: commentReact.replyId, postId: commentReact.postId },
      { $inc: { likeCount: newReact.upsertedCount > 0 ? 1 : 0 } },
    );

    if (!isLikeCounted) {
      throw new InternalServerErrorException();
    }
  }

  // find the all comments by post Id
  async getAllReactByCommentId(
    cursor?: string,
    pageSize: number = 10,
    commentId?: string,
  ) {
    const isValidId = mongoose.isValidObjectId(commentId);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const filter: any = {};
    if (cursor) filter._id = { $gt: cursor };
    if (commentId) filter.commentId = commentId;

    const commentReact = await this.commentsReactModel
      .find(filter)
      .sort({ _id: -1 })
      .limit(pageSize)
      .exec();

    if (!commentReact) {
      throw new NotFoundException('Comment not found');
    }
    return commentReact;
  }

  // find the all comments by post Id
  async getAllReactByReplyId(
    cursor?: string,
    pageSize: number = 10,
    replyId?: string,
  ) {
    const isValidId = mongoose.isValidObjectId(replyId);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const filter: any = {};
    if (cursor) filter._id = { $gt: cursor };
    if (replyId) filter.commentId = replyId;

    const replyReact = await this.commentsReactModel
      .find(filter)
      .sort({ _id: -1 })
      .limit(pageSize)
      .exec();

    if (!replyReact) {
      throw new NotFoundException('Comment not found');
    }
    return replyReact;
  }

  // async findCommentsReactById(id: string): Promise<CommentsReact> {
  //   const isValidId = mongoose.isValidObjectId(id);
  //   if (!isValidId) {
  //     throw new BadRequestException('Please enter a valid id.');
  //   }
  //   const commentsReact = await this.commentsReactModel.findById(id);

  //   if (!commentsReact) {
  //     throw new NotFoundException('CommentsReact not found');
  //   }
  //   return commentsReact;
  // }

  // async updateCommentsReactById(
  //   id: string,
  //   updateCommentsReact: CommentsReact,
  // ): Promise<CommentsReact> {
  //   return await this.commentsReactModel
  //     .findByIdAndUpdate(id, updateCommentsReact, {
  //       new: true,
  //       runValidators: true,
  //     })
  //     .orFail();
  // }

  // TODO: deleting the react method
  async deleteCommentReact(userId: string, postId: string, commentId: string) {
    const newReact = await this.commentsReactModel.findOneAndDelete({
      userId,
      commentId,
      postId,
    });

    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isLikeCounted = await this.commentModel.findOneAndUpdate(
      { _id: commentId, postId },
      { $inc: { likeCount: -1 } },
    );

    if (!isLikeCounted) {
      throw new InternalServerErrorException();
    }
  }
  // TODO: deleting the react method
  async deleteReplyReact(userId: string, postId: string, replyId: string) {
    const newReact = await this.commentsReactModel.findOneAndDelete({
      userId,
      commentId: replyId,
      postId,
    });

    if (!newReact) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const isLikeCounted = await this.replyModel.findOneAndUpdate(
      { _id: replyId, postId },
      { $inc: { likeCount: -1 } },
    );

    if (!isLikeCounted) {
      throw new InternalServerErrorException();
    }
  }

  // TODO: check postId exist or not
  private async isPostIdExist(postId: string) {
    try {
      const res = await this.client
        .send<{
          isPostId: boolean;
        }>({ cmd: 'verify-postId' }, { postId: postId })
        .toPromise();

      if (!res) {
        throw new UnauthorizedException('Wrong credentials');
      }
      return res.isPostId ? true : false;
    } catch {
      throw new InternalServerErrorException('TCP connection failed');
    }
  }

  // TODO: adding the like count in cache
  private async addLikeCount(
    postId: string,
    userId: string,
    action: 'increment' | 'decrement' | 'none',
  ) {
    try {
      const res = await this.client
        .send<{
          isLikeCounted: boolean;
        }>({ cmd: 'update-like-count' }, { postId, userId, action })
        .toPromise();

      if (!res) {
        throw new UnauthorizedException('Wrong credentials');
      }
      return res.isLikeCounted ? true : false;
    } catch (err) {
      throw new InternalServerErrorException('TCP connection failed');
    }
  }

  // TODO: adding the comment count in cache
  private async addCommentCount(
    postId: string,
    userId: string,
    action: 'increment' | 'decrement' | 'none',
  ) {
    try {
      const res = await this.client
        .send<{
          isCommentCounted: boolean;
        }>({ cmd: 'update-comment-count' }, { postId, userId, action })
        .toPromise();

      if (!res) {
        throw new UnauthorizedException('Wrong credentials');
      }
      return res.isCommentCounted ? true : false;
    } catch {
      throw new InternalServerErrorException('TCP Comment connection failed');
    }
  }

  // TODO: adding the share count in cache
  private async addShareCount(
    postId: string,
    userId: string,
    action: 'increment' | 'decrement' | 'none',
  ) {
    try {
      const res = await this.client
        .send<{
          isValid: boolean;
        }>({ cmd: 'share-created' }, { postId, userId, action })
        .toPromise();

      if (!res) {
        throw new UnauthorizedException('Wrong credentials');
      }
      return res.isValid ? true : false;
    } catch {
      throw new InternalServerErrorException('TCP connection failed');
    }
  }
}

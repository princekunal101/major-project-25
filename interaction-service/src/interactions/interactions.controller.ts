import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { React } from './schemas/react.schema';
import { Comment } from './schemas/comments.schema';
import { Reply } from './schemas/reply.schema';
import { CreateReactDto } from './dto/create-react.dto';
import { UpdateReactDto } from './dto/update-react.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { CommentsReact } from './schemas/commentsReact.schema';
import { CreateCommentsReactDto } from './dto/create-comments-react.dto';
import { CreateReplyReactDto } from './dto/create-reply-react.dto';

@Controller('interactions')
export class InteractionsController {
  constructor(private interactionsService: InteractionsService) {}

  @Get('reacts')
  async getAllReacts(): Promise<React[]> {
    return this.interactionsService.findAllReacts();
  }

  // TODO: POST creating users reactions
  @Post('create-react/:id')
  async createReact(
    @Param('id') userId: string,
    @Body()
    react: CreateReactDto,
  ) {
    return this.interactionsService.createReact(userId, react);
  }

  //   @Get(':id/reacts')
  //   async getPosts(
  //     @Param('id')
  //     id: string,
  //   ): Promise<React> {
  //     return this.interactionsService.findById(id);
  //   }

  // @UseGuards(AuthGuard)
  // @Put(':id/update-react')
  // async updateReact(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   updateReact: UpdateReactDto,
  // ): Promise<React> {
  //   return this.interactionsService.updateById(id, updateReact);
  // }

  // TODO: DELETE deleting the react method
  @Delete('delete-react/:id/:postId')
  async deleteReaction(
    @Param('id') userId: string,
    @Param('postId') postId: string,
  ) {
    return this.interactionsService.deleteReact(userId, postId);
  }

  // comment controller methods
  @Get('comments')
  async getAllComments(): Promise<Comment[]> {
    return this.interactionsService.findAllComments();
  }

  // TODO: POST creating comments
  @Post('create-comment/:id')
  async createComment(
    @Param('id') userId: string,
    @Body() comment: CreateCommentDto,
  ) {
    return this.interactionsService.createComment(userId, comment);
  }

  @Get('comment/:id')
  async getCommentById(
    @Param('id')
    id: string,
  ): Promise<Comment> {
    return this.interactionsService.findCommentById(id);
  }

  @Put('update-comment/:id/:commentId')
  async updateComment(
    @Param('id') userId: string,
    @Param('commentId') commentId: string,
    @Body() updateComment: CreateCommentDto,
  ) {
    return this.interactionsService.updateComment(
      userId,
      commentId,
      updateComment,
    );
  }

  // TODO: DELETE deleting the comment
  @Delete('delete-comment/:id/:commentId')
  async deleteComment(
    @Param('id') userId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.interactionsService.deleteComment(userId, commentId);
  }

  // reply controller methods
  @Get('replys')
  async getAllReplies(): Promise<Reply[]> {
    return this.interactionsService.findAllReplies();
  }

  // TODO: POST creating the reply
  @Post('create-reply/:id')
  async createReply(
    @Param('id') userId: string,
    @Body() reply: CreateReplyDto,
  ) {
    return this.interactionsService.createReply(userId, reply);
  }

  // @Get('reply/:id')
  // async getReplyById(
  //   @Param('id')
  //   id: string,
  // ): Promise<Reply> {
  //   return this.interactionsService.findReplyById(id);
  // }

  // TODO: PUT update the reply
  @Put('update-reply/:id/:replyId')
  async updateReply(
    @Param('id') userId: string,
    @Param('replyId') replyId: string,
    @Body() updateReply: UpdateReplyDto,
  ) {
    return this.interactionsService.updateReply(userId, replyId, updateReply);
  }

  // TODO: DELETE the reply
  @Delete('delete-reply/:id/:replyId')
  async deleteReply(
    @Param('id') userId: string,
    @Param('replyId') replyId: string,
  ) {
    return this.interactionsService.deleteReply(userId, replyId);
  }

  // comment srvice methods
  @Get('comments-services')
  async getAllCommentsReacts(): Promise<CommentsReact[]> {
    return this.interactionsService.findAllCommentsReacts();
  }

  // TODO: POST create comment react
  @Post('create-comment-react/:id')
  async createCommentsReact(
    @Param('id') userId: string,
    @Body() commentsReact: CreateCommentsReactDto,
  ) {
    return this.interactionsService.createCommentReact(userId, commentsReact);
  }

  // @Get(':id/comments-services')
  // async getCommentsReactById(
  //   @Param('id')
  //   id: string,
  // ): Promise<CommentsReact> {
  //   return this.interactionsService.findCommentsReactById(id);
  // }

  // @UseGuards(AuthGuard)
  // @Put(':id/update-comments-services')
  // async updateCommentsReact(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   updateCommentsReact: CreateCommentsReactDto,
  // ): Promise<CommentsReact> {
  //   // Assuming you have an updateCommentsReactById method in your service
  //   return this.interactionsService.updateCommentsReactById(
  //     id,
  //     updateCommentsReact,
  //   );
  // }

  // TODO: DELETE the comment react
  @Delete('delete-comment-react/:id/:postId/:commentId')
  async deleteCommentsReact(
    @Param('id') userId: string,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.interactionsService.deleteCommentReact(
      userId,
      postId,
      commentId,
    );
  }

  // TODO: POST create reply like
  @Post('create-reply-react/:id')
  async createCommentReplyReact(
    @Param('id') userId: string,
    @Body() replyReact: CreateReplyReactDto,
  ) {
    return this.interactionsService.createReplyReact(userId, replyReact);
  }

  // TODO: DELETE reply like
  @Delete('delete-reply-react/:id/:postId/:replyId')
  async deleteCommentReplyReact(
    @Param('id') userId: string,
    @Param('postId') postId: string,
    @Param('replyId') replyId: string,
  ) {
    return this.interactionsService.deleteReplyReact(userId, postId, replyId);
  }
}

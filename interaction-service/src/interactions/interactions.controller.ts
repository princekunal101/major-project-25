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
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReplyReactDto } from './dto/create-reply-react.dto';

@Controller('interactions')
export class InteractionsController {
  constructor(private interactionsService: InteractionsService) {}

  @Get('reacts')
  async getAllReacts(): Promise<React[]> {
    return this.interactionsService.findAllReacts();
  }

  // TODO: POST creating users reactions
  @UseGuards(AuthGuard)
  @Post('create-react')
  async createReact(
    @Req() req: any,
    @Body()
    react: CreateReactDto,
  ) {
    return this.interactionsService.createReact(req.userId, react);
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
  @UseGuards(AuthGuard)
  @Delete('delete-react/:id')
  async deleteReaction(@Req() req: any, @Param('id') postId: string) {
    return this.interactionsService.deleteReact(req.userId, postId);
  }

  // comment controller methods
  @Get('comments')
  async getAllComments(): Promise<Comment[]> {
    return this.interactionsService.findAllComments();
  }

  // TODO: POST creating comments
  @UseGuards(AuthGuard)
  @Post('create-comment')
  async createComment(
    @Req() req: any,
    @Body()
    comment: CreateCommentDto,
  ) {
    return this.interactionsService.createComment(req.userId, comment);
  }

  @Get('comment/:id')
  async getCommentById(
    @Param('id')
    id: string,
  ): Promise<Comment> {
    return this.interactionsService.findCommentById(id);
  }

  @UseGuards(AuthGuard)
  @Put('update-comment/:id')
  async updateComment(
    @Req() req: any,
    @Param('id') commentId: string,
    @Body() updateComment: CreateCommentDto,
  ) {
    return this.interactionsService.updateComment(
      req.userId,
      commentId,
      updateComment,
    );
  }

  // TODO: DELETE deleting the comment
  @UseGuards(AuthGuard)
  @Delete('delete-comment/:id')
  async deleteComment(@Req() req: any, @Param('id') commentId: string) {
    return this.interactionsService.deleteComment(req.userId, commentId);
  }

  // reply controller methods
  @Get('replys')
  async getAllReplies(): Promise<Reply[]> {
    return this.interactionsService.findAllReplies();
  }

  // TODO: POST creating the reply
  @UseGuards(AuthGuard)
  @Post('create-reply')
  async createReply(@Req() req: any, @Body() reply: CreateReplyDto) {
    return this.interactionsService.createReply(req.userId, reply);
  }

  // @Get('reply/:id')
  // async getReplyById(
  //   @Param('id')
  //   id: string,
  // ): Promise<Reply> {
  //   return this.interactionsService.findReplyById(id);
  // }

  // TODO: PUT update the reply
  @UseGuards(AuthGuard)
  @Put('update-reply/:id')
  async updateReply(
    @Req() req: any,
    @Param('id')
    replyId: string,
    @Body()
    updateReply: UpdateReplyDto,
  ) {
    return this.interactionsService.updateReply(
      req.userId,
      replyId,
      updateReply,
    );
  }

  // TODO: DELETE the reply
  @UseGuards(AuthGuard)
  @Delete('delete-reply/:id')
  async deleteReply(
    @Req() req: any,
    @Param('id') replyId: string,
  ) {
    return this.interactionsService.deleteReply(req.userId, replyId);
  }

  // comment srvice methods

  @Get('comments-services')
  async getAllCommentsReacts(): Promise<CommentsReact[]> {
    return this.interactionsService.findAllCommentsReacts();
  }

  // TODO: POST create comment react
  @UseGuards(AuthGuard)
  @Post('create-comment-react')
  async createCommentsReact(
    @Req() req: any,
    @Body() commentsReact: CreateCommentsReactDto,
  ) {
    return this.interactionsService.createCommentReact(
      req.userId,
      commentsReact,
    );
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
  @UseGuards(AuthGuard)
  @Delete('delete-comment-react/:postId/:commentId')
  async deleteCommentsReact(
    @Req() req: any,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.interactionsService.deleteCommentReact(
      req.userId,
      postId,
      commentId,
    );
  }

  // TODO: POST create reply like
  @UseGuards(AuthGuard)
  @Post('create-reply-react')
  async createCommentReplyReact(
    @Req() req: any,
    @Body() replyReact: CreateReplyReactDto,
  ) {
    return this.interactionsService.createReplyReact(
      req.userId,
      replyReact,
    );
  }

  // TODO: DELETE reply like
  @UseGuards(AuthGuard)
  @Delete('delete-reply-react/:postId/:replyId')
  async deleteCommentReplyReact(
    @Req() req: any,
    @Param('postId') postId: string,
    @Param('replyId') replyId: string,
  ) {
    return this.interactionsService.deleteReplyReact(
      req.userId,
      postId,
      replyId,
    );
  }
}

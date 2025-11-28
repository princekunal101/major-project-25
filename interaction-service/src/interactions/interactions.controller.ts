import { Controller,Get, Post,Put,Delete, Body, Param  } from '@nestjs/common';
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


@Controller('interactions')
export class InteractionsController {
    constructor(private interactionsService: InteractionsService) {}

    @Get('reacts')
    async getAllReacts(): Promise<React[]>{
        return this.interactionsService.findAllReacts();
    }

    @Post('create-react')
    async createReact(
        @Body() 
        react:CreateReactDto,
    ): Promise<React>{
        return this.interactionsService.createReact(react);
    }

     @Get(':id/reacts')
    async getPosts(
        @Param('id') 
        id:string
    ):Promise<React>{
        return this.interactionsService.findById(id);
    }

    @Put(':id/update-react')
    async updateReact(
        @Param('id') 
        id:string,
        @Body()
        updateReact:UpdateReactDto,
    ):Promise<React>{
        return this.interactionsService.updateById(id, updateReact);
    }

    @Delete(':id/delete-react')
    async deletePost(
        @Param('id') id:string
    ):Promise<React>{
        return this.interactionsService.deleteById(id);
    }

    // comment controller methods
    @Get('comments')
    async getAllComments(): Promise<Comment[]>{
        return this.interactionsService.findAllComments();
    }

    @Post('create-comments')
    async createComment(
        @Body() 
        comment:CreateCommentDto,
    ): Promise<Comment>{
        return this.interactionsService.createComment(comment);
    }

    @Get(':id/comments')
    async getCommentById(
        @Param('id') 
        id:string
    ):Promise<Comment>{
        return this.interactionsService.findCommentById(id);
    }

    @Put(':id/update-comments')
    async updateComment(
        @Param('id') 
        id:string,
        @Body()
        updateComment:UpdateCommentDto,
    ):Promise<Comment>{
        return this.interactionsService.updateCommentById(id, updateComment);
    }

    @Delete(':id/delete-comments')
    async deleteComment(
        @Param('id') id:string
    ):Promise<Comment>{
        return this.interactionsService.deleteCommentById(id);
    }   


    // reply controller methods
    @Get('replys')
    async getAllReplies(): Promise<Reply[]>{
        return this.interactionsService.findAllReplies();
    }

    @Post('create-reply')
    async createReply(
        @Body() 
        reply:CreateReplyDto
    ): Promise<Reply>{
        return this.interactionsService.createReply(reply);
    }


    @Get(':id/replys')
    async getReplyById(
        @Param('id') 
        id:string
    ):Promise<Reply>{
        return this.interactionsService.findReplyById(id);
    }

    @Put(':id/update-replys')
    async updateReply(
        @Param('id') 
        id:string,
        @Body()
        updateReply:UpdateReplyDto,
    ):Promise<Reply>{
        return this.interactionsService.updateReplyById(id, updateReply);
    }

    @Delete(':id/delete-replys')
    async deleteReply(
        @Param('id') id:string
    ):Promise<Reply>{
        return this.interactionsService.deleteReplyById(id);
    }



    // comment srvice methods

   @Get('comments-services')
   async getAllCommentsReacts(): Promise<CommentsReact[]>{
       return this.interactionsService.findAllCommentsReacts();
   }

   @Post('create-comments-services')
   async createCommentsReact(
       @Body() 
       commentsReact:CreateCommentsReactDto,
   ): Promise<CommentsReact>{
       return this.interactionsService.createCommentsReact(commentsReact);
   }

    @Get(':id/comments-services')
    async getCommentsReactById(
        @Param('id') 
        id:string
    ):Promise<CommentsReact>{
        return this.interactionsService.findCommentsReactById(id);
    }

    @Put(':id/update-comments-services')
    async updateCommentsReact(
        @Param('id') 
        id:string,
        @Body()
        updateCommentsReact:CreateCommentsReactDto,
    ):Promise<CommentsReact>{
        // Assuming you have an updateCommentsReactById method in your service
        return this.interactionsService.updateCommentsReactById(id, updateCommentsReact);
    }


    @Delete(':id/delete-comments-services')
    async deleteCommentsReact(
        @Param('id') id:string
    ):Promise<CommentsReact>{
        return this.interactionsService.deleteCommentsReactById(id);
    }
}



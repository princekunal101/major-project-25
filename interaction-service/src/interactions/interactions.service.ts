import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { React } from './schemas/react.schema';
import { Comment } from './schemas/comments.schema';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Reply } from './schemas/reply.schema';
import { CommentsReact } from './schemas/commentsReact.schema';
@Injectable()
export class InteractionsService {
    constructor(
        @InjectModel(React.name) 
        private reactModel: mongoose.Model<React>,
        @InjectModel(Comment.name)
        private commentModel: mongoose.Model<Comment>,

        @InjectModel(Reply.name)
        private replyModel: mongoose.Model<Reply>,

        @InjectModel(CommentsReact.name)
        private commentsReactModel: mongoose.Model<CommentsReact>

    ) {}

    async findAllReacts(): Promise<React[]> {
        const reacts = await this.reactModel.find();
        return reacts;
    }

    async createReact(react:React ): Promise<React> {
        const newReact = new this.reactModel(react);
        return newReact.save();
    }

    async findById(id:string): Promise<React> {

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException("Please enter a valid id");
        }
        const react = await this.reactModel.findById(id).orFail();

        if (!react) {
            throw new NotFoundException('React not found');
        }

        return react;
    }

    async updateById(id:string, updateReact:React): Promise<React> {
        return await this.reactModel.findByIdAndUpdate(id, updateReact, {
            new: true,
            runValidators: true
        }).orFail();
    }

    async deleteById(id:string):Promise<React>{
        return await this.reactModel.findByIdAndDelete(id).orFail();
    }



    // comment service methods
    async findAllComments(): Promise<Comment[]> {
        const comments = await this.commentModel.find();
        return comments;
    }

    async createComment(comment:Comment ): Promise<Comment> {
        const newComment = new this.commentModel(comment);
        return newComment.save();
    }

   
    async findCommentById(id:string): Promise<Comment> {

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException("Please enter a valid id.");
        }

        const comment = await this.commentModel.findById(id);

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }   
        return comment;
    }

    async updateCommentById(id:string, updateComment:Comment): Promise<Comment> {
        return await this.commentModel.findByIdAndUpdate(id, updateComment, {
            new: true,
            runValidators: true
        }).orFail();
    }

    async deleteCommentById(id:string):Promise<Comment>{
        return await this.commentModel.findByIdAndDelete(id).orFail();
    }  
    
    
    // reply service methods
    async findAllReplies(): Promise<Reply[]> {
        const replies = await this.replyModel.find();
        return replies;
    }

    async createReply(reply:Reply ): Promise<Reply> {
        const newReply = new this.replyModel(reply);
        return newReply.save();
    }

    async findReplyById(id:string): Promise<Reply> {

        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException("Please enter a valid id.");
        }
        const reply = await this.replyModel.findById(id);

        if (!reply) {
            throw new NotFoundException('Reply not found');
        }   
        return reply;
    }

    async updateReplyById(id:string, updateReply:Reply): Promise<Reply> {
        return await this.replyModel.findByIdAndUpdate(id, updateReply, {
            new: true,
            runValidators: true
        }).orFail();
    }

    async deleteReplyById(id:string):Promise<Reply>{
        return await this.replyModel.findByIdAndDelete(id).orFail();
    }




    // comments react service methods

    async findAllCommentsReacts(): Promise<CommentsReact[]> {
        const commentsReacts = await this.commentsReactModel.find();
        return commentsReacts;  
    }

    async createCommentsReact(commentsReact:CommentsReact ): Promise<CommentsReact> {
        const newCommentsReact = new this.commentsReactModel(commentsReact);
        return newCommentsReact.save();
    }

    async findCommentsReactById(id:string): Promise<CommentsReact> {

        const isValidId = mongoose.isValidObjectId(id); 
        if(!isValidId){
            throw new BadRequestException("Please enter a valid id.");
        }
        const commentsReact = await this.commentsReactModel.findById(id);

        if (!commentsReact) {
            throw new NotFoundException('CommentsReact not found');
        }
        return commentsReact;
    }
    
    async updateCommentsReactById(id:string, updateCommentsReact:CommentsReact): Promise<CommentsReact> {
        return await this.commentsReactModel.findByIdAndUpdate(id, updateCommentsReact, {
            new: true,
            runValidators: true
        }).orFail();
    }


    async deleteCommentsReactById(id:string):Promise<CommentsReact>{
        return await this.commentsReactModel.findByIdAndDelete(id).orFail();
    }
}

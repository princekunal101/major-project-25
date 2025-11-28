import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema({ 
    timestamps: true 
})

export class Comment {  
    @Prop({ required: true })
    userId: string; 

    @Prop({ required: true })
    postId: string;

    @Prop({ required: true })
    isEdited: boolean;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
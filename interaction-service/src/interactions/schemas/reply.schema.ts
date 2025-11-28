import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema({ 
    timestamps: true 
})

export class Reply {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    postId: string;

    @Prop({ required: true })
    commentId: string;

    @Prop({ required: true })
    isEdited: boolean;

}
export const ReplySchema = SchemaFactory.createForClass(Reply);
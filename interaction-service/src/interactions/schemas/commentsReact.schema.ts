import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ReactTypes {
    LIKE = 'like',
    LOVE = 'love',
    HAHA = 'haha',
    WOW = 'wow',
    SAD = 'sad',
    ANGRY = 'angry'
}


@Schema({
    timestamps: true
})

export class CommentsReact{

    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    postId: string;

    @Prop({required: true,enum: ReactTypes})
    reactType: ReactTypes;

    @Prop({required: true})
    commentId: string;

}

export const CommentsReactSchema = SchemaFactory.createForClass(CommentsReact);
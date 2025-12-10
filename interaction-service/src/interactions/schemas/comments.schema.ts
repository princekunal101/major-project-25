import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Comment {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  data: string;

  @Prop({ type: Number })
  likeCount: number;

  @Prop({ type: Number })
  replyCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

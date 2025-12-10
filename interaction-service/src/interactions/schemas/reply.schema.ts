import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Reply {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true })
  data: string;

  @Prop({ type: Number })
  likeCount: number;
}
export const ReplySchema = SchemaFactory.createForClass(Reply);

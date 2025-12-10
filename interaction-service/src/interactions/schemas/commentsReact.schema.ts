import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReactType } from './react.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CommentsReact {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true, enum: ReactType })
  reactType: ReactType;
}

export const CommentsReactSchema = SchemaFactory.createForClass(CommentsReact);

// for uniqueness
CommentsReactSchema.index(
  { userId: 1, postId: 1, commentId: 1 },
  { unique: true },
);

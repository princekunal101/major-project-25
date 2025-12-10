import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Contents } from './content.schema';

export enum ContentType {
  TEXT = 'text',
  MARKDOWN = 'markdown',
  OTHER = 'other',
}

@Schema({ timestamps: false, versionKey: false })
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subTitle: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: false })
  tags: string[];

  @Prop({ required: false })
  summaryTitle: string;

  @Prop({ required: false })
  summary: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

@Schema({ timestamps: true, versionKey: false })
export class GeneratePost extends Document {
  @Prop({ required: true })
  postedBy: string;

  @Prop({ required: true })
  communityId: string;

  @Prop({ required: true, type: ContentSchema })
  content: Content;

  @Prop({ required: true, enum: ContentType })
  content_type: ContentType;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ default: 0 })
  shareCount: number;
}

export const CreatePostSchema = SchemaFactory.createForClass(GeneratePost);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Contents } from "./content.schema";



@Schema({ timestamps: true, versionKey: false })
export class CreatePost {
    
    @Prop()
    userId: string;

    @Prop({  required: true , type: Contents})
    content: string;

    @Prop()
    imageUrl: string;

    @Prop()
    communityId: string;
}

export const CreatePostSchema = SchemaFactory.createForClass(CreatePost);
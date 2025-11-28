import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";


export enum ContentType {
    TEXT = 'text',
    MARKDOWN = 'markdown',
    HTML = 'html',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio'
}




@Schema({
    timestamps: false
})

export class Contents { 

    @Prop({required:true})
    title: string;

    @Prop({required:true})
    content: string;

    @Prop({required:true, enum: ContentType})
    content_type:ContentType;

    @Prop({required:true})
    summary: string;

}

export const ContentSchema = SchemaFactory.createForClass(Contents);
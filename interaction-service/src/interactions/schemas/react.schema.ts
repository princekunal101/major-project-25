import {  Schema, Prop, SchemaFactory} from "@nestjs/mongoose";


export enum ReactType {
    LIKE = 'like',
    LOVE = 'love',
    HAHA = 'haha',
    WOW = 'wow',
    SAD = 'sad',
    ANGRY = 'angry'
}

@Schema({
    timestamps: true,
    versionKey: false
})
export class React {
    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    postId: string;

    @Prop({required: true,enum: ReactType})
    reactType: ReactType;

    @Prop({default: Date.now})
    createdAt: Date;
}


export const ReactSchema = SchemaFactory.createForClass(React);

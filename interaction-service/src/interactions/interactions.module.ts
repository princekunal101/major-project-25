import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { InteractionsService } from './interactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactSchema } from './schemas/react.schema';
import { CommentSchema } from './schemas/comments.schema';
import { ReplySchema } from './schemas/reply.schema';
import { CommentsReactSchema } from './schemas/commentsReact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'React', schema: ReactSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Reply', schema: ReplySchema },
      { name: 'CommentsReact', schema: CommentsReactSchema },
    ])
  ],
  controllers: [InteractionsController],
  providers: [InteractionsService]
})
export class InteractionsModule {}

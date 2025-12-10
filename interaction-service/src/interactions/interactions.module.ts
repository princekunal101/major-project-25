import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { InteractionsService } from './interactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactSchema } from './schemas/react.schema';
import { CommentSchema } from './schemas/comments.schema';
import { ReplySchema } from './schemas/reply.schema';
import { CommentsReactSchema } from './schemas/commentsReact.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'React', schema: ReactSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Reply', schema: ReplySchema },
      { name: 'CommentsReact', schema: CommentsReactSchema },
    ]),
    // KafkaModule,
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 8879 },
      },
    ]),
  ],
  controllers: [InteractionsController],
  providers: [InteractionsService],
})
export class InteractionsModule {}

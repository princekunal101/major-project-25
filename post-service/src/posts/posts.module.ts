import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatePostSchema } from './schemas/posts.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GeneratePost', schema: CreatePostSchema },
    ]),

    ClientsModule.register([
      {
        name: 'COMMUNITY_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 8878 },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

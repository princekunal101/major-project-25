import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { MemberRequestDto } from './dtos/member-request.dto';
import { CommunityTopics, CommunityTypes, SharedValue } from '@prisma/client';
import { UpdateCommunityDto } from './dtos/update-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  // GET All Communities Entry Point
  @Get()
  async getAllCommunities(
    @Query('cursor') cursor?: string,
    @Query('uniqueName') communityName?: string,
    @Query('topic') topic?: CommunityTopics,
    @Query('type') type?: CommunityTypes,
    @Query('value') value?: SharedValue,
  ) {
    const itemLength = 5;
    const items = await this.communitiesService.getAllCommunitiesCursor(
      cursor,
      itemLength,
      communityName,
      type,
      topic,
      value,
    );
    return {
      items,
      nextCursor: items.length ? items[items.length - 1].id : null,
      hasMore: items.length === itemLength,
    };
  }

  // POST Create community Entry Point
  @Post('create-community')
  async createCommunity(@Body() community: CreateCommunityDto) {
    return this.communitiesService.createCommunity(community);
  }

  // PUT update communities Entry point
  @Put(':id/update-community')
  async updateCommunity(
    @Param('id') id: string,
    @Body() community: UpdateCommunityDto,
  ) {
    return this.communitiesService.updateCommunity(id, community);
  }
  // POST connect to community as member
  @Post(':id/connect')
  async memberRequest(
    @Param('id') id: string,
    @Body() targetCommunityId: MemberRequestDto,
  ) {
    return this.communitiesService.memberRequest(id, targetCommunityId);
  }

  // PUT disconnect to community as member
  @Put(':id/exit')
  async detachRequest(
    @Param('id') id: string,
    @Body() targedCommunityId: MemberRequestDto,
  ) {
    return this.communitiesService.detachRequest(id, targedCommunityId);
  }
}

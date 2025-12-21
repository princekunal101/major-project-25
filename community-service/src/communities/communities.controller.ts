import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { MemberRequestDto } from './dtos/member-request.dto';
import {
  CommunityMember,
  CommunityTopics,
  CommunityTypes,
  SharedValue,
} from '@prisma/client';
import { UpdateCommunityDto } from './dtos/update-community.dto';
import { CommunityAdminDto } from './dtos/create-community-admin.dto';
import { CommunityMemberRequestDto } from './dtos/community-member-request.dto';
import { MessagePattern } from '@nestjs/microservices';

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
    @Query('userId') userId?: string,
  ) {
    const itemLength = 5;
    const items = await this.communitiesService.getAllCommunitiesCursor(
      cursor,
      itemLength,
      communityName,
      type,
      topic,
      value,
      userId,
    );
    return {
      items,
      nextCursor: items.length ? items[items.length - 1].id : null,
      hasMore: items.length === itemLength,
    };
  }

  // POST Create community Entry Point
  @Post('create-community/:id')
  async createCommunity(
    @Param('id') userId: string,
    @Body() community: CreateCommunityDto,
  ) {
    return this.communitiesService.createCommunity(userId, community);
  }

  // PUT update communities Entry point
  @Put('update-community/:id')
  async updateCommunity(
    @Param('id') userId: string,
    @Body() community: UpdateCommunityDto,
  ) {
    return this.communitiesService.updateCommunity(userId, community);
  }

  // POST connect to community as member
  @Post('connect/:id')
  async memberRequest(
    @Param('id') userId: string,
    @Body() targetCommunityId: MemberRequestDto,
  ) {
    return this.communitiesService.memberRequest(userId, targetCommunityId);
  }

  // PUT disconnect to community as member
  @Put('disconnect/:id')
  async detachRequest(
    @Param('id') userId: string,
    @Body() targedCommunityId: MemberRequestDto,
  ) {
    return this.communitiesService.detachRequest(userId, targedCommunityId);
  }

  // POST make user as community admin
  @Post('make-admin/:id')
  async makeCommunityAdmin(
    @Param('id') userId: string,
    @Body() communityAdmin: CommunityAdminDto,
  ) {
    return this.communitiesService.makeCommunityAdmin(userId, communityAdmin);
  }
  // POST remove user from community admin
  @Post('remove-admin/:id')
  async removeFromCommunityAdmin(
    @Param('id') userId: string,
    @Body() communityAdmin: CommunityAdminDto,
  ) {
    return this.communitiesService.removeFromCommunityAdmin(
      userId,
      communityAdmin,
    );
  }

  // POST accept the community member request for private community
  @Post('accept-member/:id')
  async acceptingCommunitMemberRequests(
    @Param('userId') userId: string,
    @Body() memberRequest: CommunityMemberRequestDto,
  ) {
    return this.communitiesService.acceptingCommunitMemberRequests(
      userId,
      memberRequest,
    );
  }

  // POST removing the user by group admin
  @Post('remove-member/:userId')
  async removingCommunityMembers(
    @Param('id') userId: string,
    @Body() memberRequest: CommunityMemberRequestDto,
  ) {
    return this.communitiesService.removingCommunityMembers(
      userId,
      memberRequest,
    );
  }

  // TCP Verify user for create_community
  @MessagePattern({ cmd: 'verify-community' })
  async verifyTcp(data: { userId: string; communityId: string }) {
    return this.communitiesService.verifyCommunityId(
      data.userId,
      data.communityId,
    );
  }
}

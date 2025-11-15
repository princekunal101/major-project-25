import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
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
import { AuthGuard } from 'src/guards/auth.guard';
import { CommunityAdminDto } from './dtos/create-community-admin.dto';
import { CommunityMemberRequestDto } from './dtos/community-member-request.dto';

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
  @UseGuards(AuthGuard)
  @Post('create-community')
  async createCommunity(@Req() req, @Body() community: CreateCommunityDto) {
    return this.communitiesService.createCommunity(req.userId, community);
  }

  // PUT update communities Entry point
  @UseGuards(AuthGuard)
  @Put('update-community')
  async updateCommunity(@Req() req, @Body() community: UpdateCommunityDto) {
    return this.communitiesService.updateCommunity(req.userId, community);
  }

  // POST connect to community as member
  @UseGuards(AuthGuard)
  @Post('connect')
  async memberRequest(@Req() req, @Body() targetCommunityId: MemberRequestDto) {
    return this.communitiesService.memberRequest(req.userId, targetCommunityId);
  }

  // PUT disconnect to community as member
  @UseGuards(AuthGuard)
  @Put('disconnect')
  async detachRequest(@Req() req, @Body() targedCommunityId: MemberRequestDto) {
    return this.communitiesService.detachRequest(req.userId, targedCommunityId);
  }

  // POST make user as community admin
  @UseGuards(AuthGuard)
  @Post('make-admin')
  async makeCommunityAdmin(
    @Req() req,
    @Body() communityAdmin: CommunityAdminDto,
  ) {
    return this.communitiesService.makeCommunityAdmin(
      req.userId,
      communityAdmin,
    );
  }
  // POST remove user from community admin
  @UseGuards(AuthGuard)
  @Post('remove-admin')
  async removeFromCommunityAdmin(
    @Req() req,
    @Body() communityAdmin: CommunityAdminDto,
  ) {
    return this.communitiesService.removeFromCommunityAdmin(
      req.userId,
      communityAdmin,
    );
  }

  // POST accept the community member request for private community
  @UseGuards(AuthGuard)
  @Post('accept-member')
  async acceptingCommunitMemberRequests(
    @Req() req,
    @Body() memberRequest: CommunityMemberRequestDto,
  ) {
    return this.communitiesService.acceptingCommunitMemberRequests(
      req.userId,
      memberRequest,
    );
  }

  // POST removing the user by group admin
  @UseGuards(AuthGuard)
  @Post('remove-member')
  async removingCommunityMembers(
    @Req() req,
    @Body() memberRequest: CommunityMemberRequestDto,
  ) {
    return this.communitiesService.removingCommunityMembers(
      req.userId,
      memberRequest,
    );
  }
}

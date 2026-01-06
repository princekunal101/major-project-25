import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGuard } from 'src/guards/gateway.guard';
import { GatewaySignupEmailDto } from './dtos/auth-dtos/gateway-signup-email.dto';
import { GatewaySignupOtpVerifyDto } from './dtos/auth-dtos/gateway-signup-otp-verify.dto';
import { GatewaySignupSetPasswordDto } from './dtos/auth-dtos/gateway-signup-set-password.dto';
import { GatewayLoginDto } from './dtos/auth-dtos/gateway-login.dto';
import { GatewayChangePasswordDto } from './dtos/auth-dtos/gateway-change-password.dto';
import { GatewayForgotPasswordDto } from './dtos/auth-dtos/gateway-forgot-password.dto';
import { GatewayForgotPasswordOtpVerifyDto } from './dtos/auth-dtos/gateway-forgot-password-otp-verify.dto';
import { GatewayResetPasswordDto } from './dtos/auth-dtos/gateway-reset-password.dto';
import { GatewayResetPasswordWithOtpDto } from './dtos/auth-dtos/gateway-reset-password-with-otp.dto';
import { GatewayProfileFullNameDto } from './dtos/profile-dtos/gateway-profie-fullname.dto';
import { GatewayProfileUsernameDto } from './dtos/profile-dtos/gateway-profile-username.dto';
import { GatewayUpdateProfileDto } from './dtos/profile-dtos/gateway-update-profile.dto';
import { GatewayCheckAvailableUsernameDto } from './dtos/profile-dtos/gateway-check-available-username.dto';
import { GatewayCreateCommunityDto } from './dtos/community-dtos/gateway-create-community.dto';
import { GatewayUpdateCommunityDto } from './dtos/community-dtos/gateway-update-community.dto';
import { GatewayCommunityAdminDto } from './dtos/community-dtos/gateway-create-community-admin.dto';
import { GatewayCommunityMemberRequestDto } from './dtos/community-dtos/gateway-community-member-request.dto';
import { title } from 'process';
import { GatewayGeneratePostDto } from './dtos/posts-dtos/gateway-generate-post.dto';
import { GatewayUpdatePostDto } from './dtos/posts-dtos/gateway-update-post.dto';
import { GatewayCreateReactDto } from './dtos/interaction-dtos/gateway-create-react.dto';
import { GatewayCreateCommentDto } from './dtos/interaction-dtos/gateway-create-comment.dto';
import { GatewayCreateReplyDto } from './dtos/interaction-dtos/gateway-create-reply.dto';
import { GatewayUpdateReplyDto } from './dtos/interaction-dtos/gateway-update-reply.dto';
import { GatewayCreateCommentsReactDto } from './dtos/interaction-dtos/gateway-create-comments-react.dto';
import { GatewayCreateReplyReactDto } from './dtos/interaction-dtos/gateway-create-reply-react.dto';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // AUTH service
  //POST take email-id for signup
  @Post('signup-with-email')
  async signupWithEmail(@Body() email: GatewaySignupEmailDto) {
    return this.gatewayService.getOTPWithEmail(email);
  }

  // POST resend OTP
  @Post('resend-otp')
  async resendOTPwithEmail(@Body() email: GatewaySignupEmailDto) {
    return this.gatewayService.resendOTPwithEmail(email);
  }

  // POST verify OTP
  @Post('verify-signup-otp')
  async verifyOTP(@Body() otp: GatewaySignupOtpVerifyDto) {
    return this.gatewayService.verifySignupOTP(otp);
  }

  // PUT set the user Password
  @Put('set-password')
  async setUserPassword(@Body() passwordDto: GatewaySignupSetPasswordDto) {
    return this.gatewayService.setSignupUserPassword(passwordDto);
  }

  // POST login user
  @Post('login')
  async loginUser(@Body() loginDto: GatewayLoginDto) {
    return this.gatewayService.userLogin(loginDto);
  }

  // POST refresh token
  @Post('refresh-token')
  async refreshToken(@Body() dto: { refreshToken: string }) {
    return this.gatewayService.refreshToken(dto.refreshToken);
  }

  // PUT change password
  @UseGuards(GatewayGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: GatewayChangePasswordDto,
    @Req() req: any,
  ) {
    return this.gatewayService.changePassword(req.userId, changePasswordDto);
  }

  // POST forget password
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: GatewayForgotPasswordDto) {
    return this.gatewayService.forgotPassword(forgotPasswordDto);
  }

  // POST verify forget password OTP
  @Post('verify-reset-otp')
  async verifyForgotPasswordOtp(
    @Body() forgotPasswordOtpDto: GatewayForgotPasswordOtpVerifyDto,
  ) {
    return this.gatewayService.verifyForgotPasswordOtp(forgotPasswordOtpDto);
  }

  // PUT reset password with OTP
  @Put('reset-password')
  async resetPasswordWithOtp(
    @Body() resetPasswordWithOtpDto: GatewayResetPasswordWithOtpDto,
  ) {
    return this.gatewayService.resetPasswordWithOtp(resetPasswordWithOtpDto);
  }

  // PUT reset password with Token
  @Put('reset-password-with-token')
  async resetPasswordWithToken(
    @Body() resetPasswordWithTokenDto: GatewayResetPasswordDto,
  ) {
    return this.gatewayService.resetPasswordWithToken(
      resetPasswordWithTokenDto,
    );
  }

  /// PROFILE service
  // POST create profile with full name
  @Post('create-profile')
  async createNewUserProfile(
    @Body() profileFullNameDto: GatewayProfileFullNameDto,
  ) {
    return this.gatewayService.createNewUserProfile(profileFullNameDto);
  }

  // POST set unique username
  @Post('set-username')
  async updateUsername(@Body() profileUsernameDto: GatewayProfileUsernameDto) {
    return this.gatewayService.updateUsername(profileUsernameDto);
  }

  // PUT update profile
  @UseGuards(GatewayGuard)
  @Put('update-profile')
  async updateUserProfile(
    @Req() req: any,
    @Body() updateProfileDto: GatewayUpdateProfileDto,
  ) {
    return this.gatewayService.updateProfile(req.userId, updateProfileDto);
  }

  // GET username availability
  @UseGuards(GatewayGuard)
  @Get('check-username')
  async checkUsernameAvailability(
    @Req() req: any,
    @Body() usernameAvailableDto: GatewayCheckAvailableUsernameDto,
  ) {
    return this.gatewayService.checkUsernameAvailability(
      req.userId,
      usernameAvailableDto,
    );
  }
  // GET profile by userId
  @UseGuards(GatewayGuard)
  @Get('get-profile')
  async getUserProfile(@Req() req: any) {
    return this.gatewayService.getUserProfile(req.userId);
  }

  /// COMMUNITY service

  // GET communities by cursor pagination with filters
  @Get('communities')
  async getAllCommunities(
    @Query('cursor') cursor?: string,
    @Query('uniqueName') communityName?: string,
    @Query('topic') topic?: string,
    @Query('type') type?: string,
    @Query('value') value?: string,
    @Query('userId') userId?: string,
  ) {
    return this.gatewayService.getAllCommunitiesWithCursorPagination(
      cursor,
      communityName,
      topic,
      type,
      value,
      userId,
    );
  }

  // GET community by Id
  @Get('community/:communityId')
  async getCommunityById(@Param('communityId') communityId: string) {
    return this.gatewayService.getCommunityById(communityId);
  }

  // POST create community
  @UseGuards(GatewayGuard)
  @Post('create-community')
  async createCommunity(
    @Req() req: any,
    @Body() createCommunityDto: GatewayCreateCommunityDto,
  ) {
    return this.gatewayService.createNewCommunity(
      req.userId,
      createCommunityDto,
    );
  }

  // PUT update community
  @UseGuards(GatewayGuard)
  @Put('update-community/:communityId')
  async updateCommunity(
    @Req() req: any,
    @Param('communityId') communityId: string,
    @Body() updateCommunityDto: GatewayUpdateCommunityDto,
  ) {
    return this.gatewayService.updateCommunity(
      req.userId,
      communityId,
      updateCommunityDto,
    );
  }

  // POST send request or join community
  @UseGuards(GatewayGuard)
  @Post('community-connect/:communityId')
  async communityMemberRequest(
    @Req() req: any,
    @Param('communityId') communityId: string,
  ) {
    return this.gatewayService.communityMemberRequest(req.userId, communityId);
  }

  // POST leave community or detach member
  @UseGuards(GatewayGuard)
  @Post('community-disconnect/:communityId')
  async communityDetachReqest(
    @Req() req: any,
    @Param('communityId') communityId: string,
  ) {
    return this.gatewayService.communityDetachRequest(req.userId, communityId);
  }

  // POST make community admin
  @UseGuards(GatewayGuard)
  @Post('make-community-admin')
  async makeCOmmunityAdmin(
    @Req() req: any,
    @Body() communityAdminDto: GatewayCommunityAdminDto,
  ) {
    return this.gatewayService.makeCommunityAdmin(
      req.userId,
      communityAdminDto,
    );
  }

  // POST remove from community admin
  @UseGuards(GatewayGuard)
  @Post('remove-community-admin')
  async removeFromCommunityAdmin(
    @Req() req: any,
    @Body() communityAdminDto: GatewayCommunityAdminDto,
  ) {
    return this.gatewayService.removeFromCommunityAdmin(
      req.userId,
      communityAdminDto,
    );
  }

  // POST accept member request for privaete community
  @UseGuards(GatewayGuard)
  @Post('accept-community-member-request')
  async acceptCommunityMemberRequest(
    @Req() req: any,
    @Body() memberRequestDto: GatewayCommunityMemberRequestDto,
  ) {
    return this.gatewayService.acceptCommunityMemberRequest(
      req.userId,
      memberRequestDto,
    );
  }

  // POST remove user by admin
  @UseGuards(GatewayGuard)
  @Post('remove-community-member')
  async removeCommunityMemberByAdmin(
    @Req() req: any,
    @Body() memberRequestDto: GatewayCommunityMemberRequestDto,
  ) {
    return this.gatewayService.removeCommunityMemberByAdmin(
      req.userId,
      memberRequestDto,
    );
  }

  /// POST service

  // GET all posts with filters
  @Get('get-posts')
  async getAllPostsByFilter(
    @Query('cursor') cursor?: string,
    @Query('userId') userId?: string,
    @Query('communityId') communityId?: string,
    @Query('tags') tags?: string[],
    @Query('contentType') contentType?: string,
    @Query('title') postTitle?: string,
  ) {
    return this.gatewayService.getAllPostsWithCursorPagination(
      cursor,
      userId,
      communityId,
      tags,
      contentType,
      postTitle,
    );
  }

  // POST create a post
  @UseGuards(GatewayGuard)
  @Post('create-post')
  async createPost(
    @Req() req: any,
    @Body() createPostDto: GatewayGeneratePostDto,
  ) {
    return this.gatewayService.createPost(req.userId, createPostDto);
  }

  // PUT update post by ID
  @UseGuards(GatewayGuard)
  @Put('update-post/:postId')
  async updatePost(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() updatePostDto: GatewayUpdatePostDto,
  ) {
    return this.gatewayService.updatePost(req.userId, postId, updatePostDto);
  }

  // GET the post by ID
  @UseGuards(GatewayGuard)
  @Get('get-post/:postId')
  async getPostById(@Param('postId') postId: string) {
    return this.gatewayService.getPostById(postId);
  }

  // DELETE the post by ID
  @UseGuards(GatewayGuard)
  @Delete('delete-post/:postId')
  async deletePost(@Req() req: any, @Param('postId') postId: string) {
    return this.gatewayService.deletePostById(req.userId, postId);
  }

  /// INTERACTION service

  // POST create post reactions
  @UseGuards(GatewayGuard)
  @Post('react-post')
  async createPostReaction(
    @Req() req: any,
    @Body() createReactionDto: GatewayCreateReactDto,
  ) {
    return this.gatewayService.createPostReaction(
      req.userId,
      createReactionDto,
    );
  }

  // DELETE delete post reactions
  @UseGuards(GatewayGuard)
  @Delete('delete-react-post/:postId')
  async deletePostReaction(@Req() req: any, @Param('postId') postId: string) {
    return this.gatewayService.deletePostReaction(req.userId, postId);
  }

  // POST create post comments
  @UseGuards(GatewayGuard)
  @Post('create-comment')
  async createPostComment(
    @Req() req: any,
    @Body() commentDto: GatewayCreateCommentDto,
  ) {
    return this.gatewayService.createPostComment(req.userId, commentDto);
  }

  // GET comment by id
  @UseGuards(GatewayGuard)
  @Get('get-comment/:commentId')
  async getCommentById(@Param('commentId') commentId: string) {
    return this.gatewayService.getCommentById(commentId);
  }

  // GET all comments by the postId
  @UseGuards(GatewayGuard)
  @Get('get-post-comments/:postId')
  async getCommentsByPostId(
    @Param('postId') postId: string,
    @Query('cursor') cursor: string,
  ) {
    return this.gatewayService.getAllCommentsByPostId(cursor, postId);
  }

  // PUT update comment
  @UseGuards(GatewayGuard)
  @Put('update-comment/:commentId')
  async updatePostComment(
    @Req() req: any,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: GatewayCreateCommentDto,
  ) {
    return this.gatewayService.updatePostComment(
      req.userId,
      commentId,
      updateCommentDto,
    );
  }

  // DELETE delete comment
  @UseGuards(GatewayGuard)
  @Delete('delete-comment/:commentId')
  async deleteComment(@Req() req: any, @Param('commentId') commentId: string) {
    return this.gatewayService.deletePostComment(req.userId, commentId);
  }

  // POST create reply of comment
  @UseGuards(GatewayGuard)
  @Post('create-reply-comment')
  async createReplyComment(
    @Req() req: any,
    @Body() createReplyDto: GatewayCreateReplyDto,
  ) {
    return this.gatewayService.createReplyComment(req.userId, createReplyDto);
  }

  // PUT update the relpy
  @UseGuards(GatewayGuard)
  @Put('update-reply-comment/:replyId')
  async updateReplyComment(
    @Req() req: any,
    @Param('replyId') replyId: string,
    @Body() updateReplyDto: GatewayUpdateReplyDto,
  ) {
    return this.gatewayService.updateReplyComment(
      req.userId,
      replyId,
      updateReplyDto,
    );
  }

  // GET all reply comments by the postId
  @UseGuards(GatewayGuard)
  @Get('get-comment-replies/:commentId')
  async getReplyCommentsByCommentId(
    @Param('commentId') commentId: string,
    @Query('cursor') cursor: string,
  ) {
    return this.gatewayService.getAllReplyCommentsByCommentId(
      cursor,
      commentId,
    );
  }

  // DELETE delete the reply comment
  @UseGuards(GatewayGuard)
  @Delete('delete-reply/:replyId')
  async deleteReplyComment(@Req() req: any, @Param('replyId') replyId: string) {
    return this.gatewayService.deleteReplyComment(req.userId, replyId);
  }

  // POST create comment reactions
  @UseGuards(GatewayGuard)
  @Post('create-comment-react')
  async createCommentReact(
    @Req() req: any,
    @Body() commentReactDto: GatewayCreateCommentsReactDto,
  ) {
    return this.gatewayService.createCommentReact(req.userId, commentReactDto);
  }

  //GET All commentReact by commentId
  @Get('get-comment-reacts/:commentId')
  async getAllCommentByCommentId(
    @Param('commentId') commentId: string,
    @Query('cursor') cursor: string,
  ) {
    return this.gatewayService.getAllCommentByCommentId(cursor, commentId);
  }

  // DELETE comment reactions
  @UseGuards(GatewayGuard)
  @Delete('delete-comment-react/:postId/:commentId')
  async deleteCommentReact(
    @Req() req: any,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.gatewayService.deleteCommentReact(
      req.userId,
      postId,
      commentId,
    );
  }

  // POST create reply reactions
  @UseGuards(GatewayGuard)
  @Post('create-reply-react')
  async createReactonReply(
    @Req() req: any,
    @Body() createReplyReactDto: GatewayCreateReplyReactDto,
  ) {
    return this.gatewayService.createReactReply(
      req.userId,
      createReplyReactDto,
    );
  }

  //GET All ReplyReact by replyId
  @Get('get-reply-reacts/:replyId')
  async getAllReactByReplyId(
    @Param('replyId') replyId: string,
    @Query('cursor') cursor: string,
  ) {
    return this.gatewayService.getAllReactByReplyId(cursor, replyId);
  }

  // DELETE reply reactions
  @UseGuards(GatewayGuard)
  @Delete('delete-reply-react/:postId/:replyId')
  async deleteReactReply(
    @Req() req: any,
    @Param('postId') postId: string,
    @Param('replyId') replyId: string,
  ) {
    return this.gatewayService.deleteReactReply(req.userId, postId, replyId);
  }
}

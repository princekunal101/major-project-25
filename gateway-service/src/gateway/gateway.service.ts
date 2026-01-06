import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { GatewaySignupEmailDto } from './dtos/auth-dtos/gateway-signup-email.dto';
import { HttpService } from '@nestjs/axios';
import { first, firstValueFrom } from 'rxjs';
import axios from 'axios';
import { ServiceUnavailableException } from 'src/exceptions/service-unavailable.exception';
import { GatewaySignupOtpVerifyDto } from './dtos/auth-dtos/gateway-signup-otp-verify.dto';
import { threadCpuUsage } from 'process';
import { AxiosForwardException } from 'src/exceptions/axiox-forward.exception';
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
import { GatewayGeneratePostDto } from './dtos/posts-dtos/gateway-generate-post.dto';
import { GatewayUpdatePostDto } from './dtos/posts-dtos/gateway-update-post.dto';
import { GatewayCreateReactDto } from './dtos/interaction-dtos/gateway-create-react.dto';
import { GatewayCreateCommentDto } from './dtos/interaction-dtos/gateway-create-comment.dto';
import { GatewayCreateReplyDto } from './dtos/interaction-dtos/gateway-create-reply.dto';
import { GatewayUpdateReplyDto } from './dtos/interaction-dtos/gateway-update-reply.dto';
import { GatewayCreateCommentsReactDto } from './dtos/interaction-dtos/gateway-create-comments-react.dto';
import { GatewayCreateReplyReactDto } from './dtos/interaction-dtos/gateway-create-reply-react.dto';

@Injectable()
export class GatewayService {
  constructor(private readonly http: HttpService) {}

  /// AUTH service modules
  private readonly AUTH_BASE_URL = 'http://localhost:3001/auth';

  // signup with email method
  async getOTPWithEmail(email: GatewaySignupEmailDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.AUTH_BASE_URL}/signup-email`, email),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // resend otp with email method
  async resendOTPwithEmail(email: GatewaySignupEmailDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.AUTH_BASE_URL}/resend-otp`, email),
      );

      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // verify otp method
  async verifySignupOTP(otp: GatewaySignupOtpVerifyDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.AUTH_BASE_URL}/signup-verify-otp`, otp),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // set user password method
  async setSignupUserPassword(passwordDto: GatewaySignupSetPasswordDto) {
    try {
      const response = await firstValueFrom(
        this.http.put(`${this.AUTH_BASE_URL}/set-password`, passwordDto),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // User login method
  async userLogin(loginDto: GatewayLoginDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.AUTH_BASE_URL}/login`, loginDto),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // refresh token method
  async refreshToken(refreshToken: string) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.AUTH_BASE_URL}/refresh`, { refreshToken }),
      );

      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // change password method
  async changePassword(
    userId: string,
    changePasswordDto: GatewayChangePasswordDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.AUTH_BASE_URL}/change-password/${userId}`,
          changePasswordDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // forget password method
  async forgotPassword(forgotPasswordDto: GatewayForgotPasswordDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.AUTH_BASE_URL}/forgot-password`,
          forgotPasswordDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // verify forget password OTP method
  async verifyForgotPasswordOtp(
    forgotPasswordOtpDto: GatewayForgotPasswordOtpVerifyDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.AUTH_BASE_URL}/reset-otp-verify`,
          forgotPasswordOtpDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // reset password with OTP method
  async resetPasswordWithOtp(
    resetPasswordWithOtpDto: GatewayResetPasswordWithOtpDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.AUTH_BASE_URL}/reset-password-with-otp`,
          resetPasswordWithOtpDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // reset password with Token method
  async resetPasswordWithToken(
    resetPasswordWithTokenDto: GatewayResetPasswordDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.AUTH_BASE_URL}/reset-password`,
          resetPasswordWithTokenDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  /// PROFILE service modules
  private readonly PROFILE_BASE_URL = 'http://localhost:3002/profiles';

  // create new user profile method
  async createNewUserProfile(profileFullNameDto: GatewayProfileFullNameDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.PROFILE_BASE_URL}/create-profile`,
          profileFullNameDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // update username method
  async updateUsername(profileUsernameDto: GatewayProfileUsernameDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.PROFILE_BASE_URL}/set-username`,
          profileUsernameDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // update profile method
  async updateProfile(
    userId: string,
    updateProfileDto: GatewayUpdateProfileDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.PROFILE_BASE_URL}/update-profile/${userId}`,
          updateProfileDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // check username availability method
  async checkUsernameAvailability(
    userId: string,
    usernameAvailableDto: GatewayCheckAvailableUsernameDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.PROFILE_BASE_URL}/check-username/${userId}`, {
          params: usernameAvailableDto,
        }),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get profile by userId method
  async getUserProfile(userId: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.PROFILE_BASE_URL}/get-profile/${userId}`),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  /// COMMUNITY service modules

  private readonly COMMUNITY_BASE_URL = 'http://localhost:3003/communities';

  // get all communities with cursor pagination method with filters
  async getAllCommunitiesWithCursorPagination(
    cursor?: string,
    communityName?: string,
    topic?: string,
    type?: string,
    value?: string,
    userId?: string,
  ) {
    try {
      const query = new URLSearchParams();
      if (cursor) query.append('cursor', cursor);
      if (communityName) query.append('uniqueName', communityName);
      if (topic) query.append('topic', topic);
      if (type) query.append('type', type);
      if (value) query.append('value', value);
      if (userId) query.append('userId', userId);
      const response = await firstValueFrom(
        this.http.get(
          `${this.COMMUNITY_BASE_URL}/communities?${query.toString()}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get community by Id method
  async getCommunityById(communityId: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.COMMUNITY_BASE_URL}/${communityId}`),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // creating new community method
  async createNewCommunity(
    userId: string,
    createCommunityDto: GatewayCreateCommunityDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.COMMUNITY_BASE_URL}/create-community/${userId}`,
          createCommunityDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // updating community method
  async updateCommunity(
    userId: string,
    communityId: string,
    updateCommunityDto: GatewayUpdateCommunityDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.COMMUNITY_BASE_URL}/update-community/${userId}/${communityId}`,
          updateCommunityDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // sending the member request to community method
  async communityMemberRequest(userId: string, communityId: string) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.COMMUNITY_BASE_URL}/connect/${userId}/${communityId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // sending the detach member request to community method
  async communityDetachRequest(userId: string, communityId: string) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.COMMUNITY_BASE_URL}/disconnect/${userId}/${communityId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // make community admin method
  async makeCommunityAdmin(
    userId: string,
    communityAdminDto: GatewayCommunityAdminDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.COMMUNITY_BASE_URL}/make-admin/${userId}`,
          communityAdminDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // remove from community admin method
  async removeFromCommunityAdmin(
    userId: string,
    communityAdminDto: GatewayCommunityAdminDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.COMMUNITY_BASE_URL}/remove-admin/${userId}`,
          communityAdminDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // accept community member request method
  async acceptCommunityMemberRequest(
    userId: string,
    memberRequestDto: GatewayCommunityMemberRequestDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.COMMUNITY_BASE_URL}/accept-member/${userId}`,
          memberRequestDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // remove community member by admin method
  async removeCommunityMemberByAdmin(
    userId: string,
    memberRequestDto: GatewayCommunityMemberRequestDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.COMMUNITY_BASE_URL}/remove-member/${userId}`,
          memberRequestDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  /// POST service modules

  private readonly POST_BASE_URL = 'http://localhost:3004/posts';

  // get all posts by filter method
  async getAllPostsWithCursorPagination(
    cursor?: string,
    userId?: string,
    communityId?: string,
    tags?: string[],
    contentType?: string,
    postTitle?: string,
  ) {
    try {
      const query = new URLSearchParams();
      if (cursor) query.append('cursor', cursor);
      if (userId) query.append('userId', userId);
      if (communityId) query.append('communityId', communityId);
      if (tags) query.append('tags', tags.join(','));
      if (contentType) query.append('contentType', contentType);
      if (postTitle) query.append('title', postTitle);

      const response = await firstValueFrom(
        this.http.get(`${this.POST_BASE_URL}/posts?${query.toString()}`),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // create post method
  async createPost(userId: string, createPostDto: GatewayGeneratePostDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.POST_BASE_URL}/upload-post/${userId}`,
          createPostDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // update post method
  async updatePost(
    userId: string,
    postId: string,
    updatePostDto: GatewayUpdatePostDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.POST_BASE_URL}/update-post/${userId}/${postId}`,
          updatePostDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get post by id
  async getPostById(postId: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.POST_BASE_URL}/post/${postId}`),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // delete post by id
  async deletePostById(userId: string, postId: string) {
    try {
      const response = await firstValueFrom(
        this.http.delete(
          `${this.POST_BASE_URL}/delete-post/${userId}/${postId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  /// INTERACTION service methods

  private readonly INTERACTION_BASE_URL = 'http://localhost:3005/interactions';

  // create post reaction method
  async createPostReaction(
    userId: string,
    createReactionDto: GatewayCreateReactDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.INTERACTION_BASE_URL}/create-react/${userId}`,
          createReactionDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // delelte post reactions
  async deletePostReaction(userId: string, postId: string) {
    try {
      const response = await firstValueFrom(
        this.http.delete(
          `${this.INTERACTION_BASE_URL}/delete-react/${userId}/${postId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // create post comment method
  async createPostComment(userId: string, commentDto: GatewayCreateCommentDto) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.INTERACTION_BASE_URL}/create-comment/${userId}`,
          commentDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get comment by id
  async getCommentById(commentId: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.INTERACTION_BASE_URL}/comment/${commentId}`),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get all comments by the post id
  async getAllCommentsByPostId(cursor: string, postId: string) {
    try {
      const query = new URLSearchParams();
      if (cursor) query.append('cursor', cursor);
      const response = await firstValueFrom(
        this.http.get(
          `${this.INTERACTION_BASE_URL}/get-post-comments/${postId}`,
          { params: { cursor } },
        ),
      );
      return response.data;
    } catch (error) {
      console.log('throwing error');
      throw new AxiosForwardException(error);
    }
  }

  // update comment by Id
  async updatePostComment(
    userId: string,
    commetnId: string,
    updateCommentDto: GatewayCreateCommentDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.INTERACTION_BASE_URL}/update-comment/${userId}/${commetnId}`,
          updateCommentDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // delete post comment by commentId
  async deletePostComment(userId: string, commentId: string) {
    try {
      const response = await firstValueFrom(
        this.http.delete(
          `${this.INTERACTION_BASE_URL}/delete-comment/${userId}/${commentId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // create reply comment
  async createReplyComment(
    userId: string,
    createReplyDto: GatewayCreateReplyDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.INTERACTION_BASE_URL}/create-reply/${userId}`,
          createReplyDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // update repl comments method
  async updateReplyComment(
    userId: string,
    replyId: string,
    updateReplyDto: GatewayUpdateReplyDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.put(
          `${this.INTERACTION_BASE_URL}/update-reply/${userId}/${replyId}`,
          updateReplyDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get all comments by the post id
  async getAllReplyCommentsByCommentId(cursor: string, commentId: string) {
    try {
      const query = new URLSearchParams();
      if (cursor) query.append('cursor', cursor);
      const response = await firstValueFrom(
        this.http.get(
          `${this.INTERACTION_BASE_URL}/get-comments-replies/${commentId}`,
          { params: { cursor } },
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // delete reply method
  async deleteReplyComment(userId: string, replyId: string) {
    try {
      const response = await firstValueFrom(
        this.http.delete(
          `${this.INTERACTION_BASE_URL}/delete-reply/${userId}/${replyId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // react on comment method
  async createCommentReact(
    userId: string,
    createCommentReactDto: GatewayCreateCommentsReactDto,
  ) {
    console.log(createCommentReactDto);
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.INTERACTION_BASE_URL}/create-comment-react/${userId}`,
          createCommentReactDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get all comments by the post id
  async getAllCommentByCommentId(cursor: string, commentId: string) {
    try {
      const query = new URLSearchParams();
      if (cursor) query.append('cursor', cursor);
      const response = await firstValueFrom(
        this.http.get(
          `${this.INTERACTION_BASE_URL}/get-comment-reacts/${commentId}`,
          { params: { cursor } },
        ),
      );
      return response.data;
    } catch (error) {
      console.log('throwing error');
      throw new AxiosForwardException(error);
    }
  }

  // delete on commetn react method
  async deleteCommentReact(userId: string, postId: string, commentId: string) {
    try {
      const response = await firstValueFrom(
        this.http.delete(
          `${this.INTERACTION_BASE_URL}/delete-comment-react/${userId}/${postId}/${commentId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // create reply react method
  async createReactReply(
    userId: string,
    createReplyReactDto: GatewayCreateReplyReactDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.INTERACTION_BASE_URL}/create-reply-react/${userId}`,
          createReplyReactDto,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }

  // get all comments by the post id
  async getAllReactByReplyId(cursor: string, commentId: string) {
    try {
      const query = new URLSearchParams();
      if (cursor) query.append('cursor', cursor);
      const response = await firstValueFrom(
        this.http.get(
          `${this.INTERACTION_BASE_URL}/get-reply-reacts/${commentId}`,
          { params: { cursor } },
        ),
      );
      return response.data;
    } catch (error) {
      console.log('throwing error');
      throw new AxiosForwardException(error);
    }
  }

  // delete reply react method
  async deleteReactReply(userId: string, postId: string, replyId: string) {
    try {
      const response = await firstValueFrom(
        this.http.delete(
          `${this.INTERACTION_BASE_URL}/delete-reply-react/${userId}/${postId}/${replyId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new AxiosForwardException(error);
    }
  }
}

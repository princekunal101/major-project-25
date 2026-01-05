import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GatewaySignupEmailDto } from './dtos/auth-dtos/gateway-signup-email.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
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

  /// INTERACTION service mosules
}

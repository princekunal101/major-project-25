import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewaySignupEmailDto } from './dtos/gateway-signup-email.dto';
import { GatewaySignupOtpVerifyDto } from './dtos/gateway-signup-otp-verify.dto';
import { GatewaySignupSetPasswordDto } from './dtos/gateway-signup-set-password.dto';
import { GatewayLoginDto } from './dtos/gateway-login.dto';
import { GatewayGuard } from 'src/guards/gateway.guard';
import { GatewayChangePasswordDto } from './dtos/gateway-change-password.dto';
import { GatewayForgotPasswordDto } from './dtos/gateway-forgot-password.dto';
import { GatewayForgotPasswordOtpVerifyDto } from './dtos/gateway-forgot-password-otp-verify.dto';
import { GatewayResetPasswordDto } from './dtos/gateway-reset-password.dto';
import { GatewayResetPasswordWithOtpDto } from './dtos/gateway-reset-password-with-otp.dto';
import { GatewayProfileFullNameDto } from './dtos/gateway-profie-fullname.dto';
import { GatewayProfileUsernameDto } from './dtos/gateway-profile-username.dto';
import { GatewayUpdateProfileDto } from './dtos/gateway-update-profile.dto';
import { GatewayCheckAvailableUsernameDto } from './dtos/gateway-check-available-username.dto';

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

  /// POST service

  /// INTERACTION service
}

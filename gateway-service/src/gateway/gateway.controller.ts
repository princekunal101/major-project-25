import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewaySignupEmailDto } from './dtos/gateway-signup-email.dto';
import { GatewaySignupOtpVerifyDto } from './dtos/gateway-signup-otp-verify.dto';
import { GatewaySignupSetPasswordDto } from './dtos/gateway-signup-set-password.dto';
import { GatewayLoginDto } from './dtos/gateway-login.dto';

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

  // PROFILE service

  // COMMUNITY service

  // POST service

  // INTERACTION service
}

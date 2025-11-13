import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SignupEmailDto } from './dtos/signup-email.dto';
import { SignupOtpVerifyDto } from './dtos/signup-otp-verify.dto';
import { SignupSetPasswordDto } from './dtos/signup-set-password.dto';
import { ForgotPasswordOtpVerifyDto } from './dtos/forgot-password-otp-verify.dto';
import { ResetPasswordWithOtpDto } from './dtos/reset-password-with-otp.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Handling invalid TCP message
  @MessagePattern()
  handleUnknown(data: any) {
    console.warn('Recived Invalid TCP message:', data);
    return { error: 'Invalid Message Format' };
  }

  // POST SignUp Email Entry Point
  @Post('signup-email')
  async signupEmail(@Body() signupEmail: SignupEmailDto) {
    return this.authService.signupEmail(signupEmail);
  }

  // POST SignUp OTP Verify Entry Point
  @Post('signup-verify-otp')
  async signupVerifyOtp(@Body() signupVerifyOtp: SignupOtpVerifyDto) {
    return this.authService.signupVerifyOtp(signupVerifyOtp);
  }
  // PUT SignUp Password Entry Point
  @Put('set-password')
  async signupSetPassword(@Body() setPassword: SignupSetPasswordDto) {
    return this.authService.signupSetPassword(setPassword);
  }

  // POST Resend OTP
  @Post('resend-otp')
  async signupResendOtp(@Body() resendOtp: SignupEmailDto) {
    return this.authService.signupResendOtp(resendOtp);
  }

  // POST Login
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  // POST Verify user for create_community
  @Post('verify-for-community-user')
  async verifyForCommunityUser(@Body() dto: { id: string }) {
    return this.authService.verifyForCommunityUser(dto.id);
  }

  // TCP Verify user for create_community
  @MessagePattern({ cmd: 'verify-for-community-user' })
  async verifyTcp(data: { userId: string }) {
    return this.authService.verifyForCommunityUser(data.userId);
  }

  // POST Referesh TOken
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  // PUT Change Password
  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  // Forgot Password
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(
      forgotPasswordDto.email,
      forgotPasswordDto.isOtpMode,
    );
  }

  // TODO: Verify-reset otps
  @Post('reset-otp-verify')
  async resetOtpVerify(@Body() resetOtpVerify: ForgotPasswordOtpVerifyDto) {
    return this.authService.resetOtpVerify(
      resetOtpVerify.email,
      resetOtpVerify.otp,
    );
  }

  // Reset Password
  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }

  // Reset Password with otps
  @Put('reset-password-with-otp')
  async resetPasswordWithOtp(
    @Body() resetPasswordWithOtpDto: ResetPasswordWithOtpDto,
  ) {
    return this.authService.resetPasswordWithOtp(
      resetPasswordWithOtpDto.newPassword,
      resetPasswordWithOtpDto.email,
    );
  }
}

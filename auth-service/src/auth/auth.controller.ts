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
import { ResetOtp } from '@prisma/client';
import { ForgotPasswordOtpVerifyDto } from './dtos/forgot-password-otp-verify.dto';
import { ResetPasswordWithOtpDto } from './dtos/reset-password-with-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  // TODO: POST Resend OTP
  @Post('resend-otp')
  async signupResendOtp(@Body() resendOtp: SignupEmailDto) {
    return this.authService.signupResendOtp(resendOtp);
  }

  // POST Login
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
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
    return this.authService.resetOtpVerify(resetOtpVerify.email, resetOtpVerify.otp);
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
  async resetPasswordWithOtp(@Body() resetPasswordWithOtpDto: ResetPasswordWithOtpDto) {
    return this.authService.resetPasswordWithOtp(
      resetPasswordWithOtpDto.newPassword,
      resetPasswordWithOtpDto.email,
    );
  }
}

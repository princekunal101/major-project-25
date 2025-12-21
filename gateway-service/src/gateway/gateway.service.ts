import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GatewaySignupEmailDto } from './dtos/gateway-signup-email.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { ServiceUnavailableException } from 'src/exceptions/service-unavailable.exception';
import { GatewaySignupOtpVerifyDto } from './dtos/gateway-signup-otp-verify.dto';
import { threadCpuUsage } from 'process';
import { AxiosForwardException } from 'src/exceptions/axiox-forward.exception';
import { GatewaySignupSetPasswordDto } from './dtos/gateway-signup-set-password.dto';
import { GatewayLoginDto } from './dtos/gateway-login.dto';

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

  /// PROFILE service modules

  /// COMMUNITY service modules

  /// POST service modules

  /// INTERACTION service mosules
}

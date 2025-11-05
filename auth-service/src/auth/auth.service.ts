import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { MailService } from 'src/services/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupEmailDto } from './dtos/signup-email.dto';
import { SignupOtpVerifyDto } from './dtos/signup-otp-verify.dto';
import { SignupSetPasswordDto } from './dtos/signup-set-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    private prisma: PrismaService,
  ) {}

  // SignUp Email Entry Point
  async signupEmail(signupEmail: SignupEmailDto) {
    // check if email exists in DB
    const emailInUse = await this.prisma.user.findUnique({
      where: { email: signupEmail.email, isVerified: true },
    });

    // If exists, return error
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    // If not, generate OTP
    const otp = this.generateOtp();

    // Save temp user document with email, OTP,
    const userExist = await this.prisma.user.findUnique({
      where: { email: signupEmail.email },
    });
    const prismaUser = await this.prisma.user.upsert({
      where: { id: userExist?.id },
      update: {},
      create: {
        email: signupEmail.email,
        isVerified: false,
      },
    });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await this.prisma.otp.create({
      data: {
        code: otp,
        expiresAt: expiresAt,
        userId: prismaUser.id,
        verified: false,
      },
    });
    // Send OTP to user's email using MailService
    this.mailService.sendOtpEmail(signupEmail.email, otp);

    // Return success response with temp token
    return { message: 'If this email exists, otp will recive on email' };
  }

  // Signup Resend Otp Entry Point
  async signupResendOtp(resendOtp: SignupEmailDto) {
    // check if email exists in DB
    const user = await this.prisma.user.findUnique({
      where: { email: resendOtp.email, isVerified: false },
    });

    // If exists, return error
    if (!user) {
      throw new NotFoundException('User not found..');
    }
    // If not, generate OTP
    const otp = this.generateOtp();

    // Find last OTP
    const latestOtp = await this.prisma.otp.findFirst({
      where: { userId: user.id, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    // Cooldown by 30 sec
    if (latestOtp && Date.now() - latestOtp.createdAt.getTime() < 30000) {
      throw new TooManyRequestsException(
        'Please wait before resending the OTP',
      );
    }

    await this.prisma.otp.create({
      data: {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
        userId: user.id,
        verified: false,
      },
    });
    // Send OTP to user's email using MailService
    this.mailService.sendOtpEmail(resendOtp.email, otp);

    // Return success response with temp token
    return { message: 'If this email exists, otp will recive on email' };
  }

  // SignUp OTP Verify Entry Point
  async signupVerifyOtp(verifyOtp: SignupOtpVerifyDto) {
    // 1. TODO: Accept OTP and email
    const { email, otp } = verifyOtp;

    // 2. TODO: FInd userId from users
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found...');
    }

    // 3. TODO: Verify OTP
    const verify = await this.prisma.otp.findFirst({
      where: {
        userId: user.id,
        code: otp,
        verified: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
    // 4. TODO: If not valid, return error
    if (!verify) {
      throw new UnauthorizedException('Invalid OTP');
    }
    // 5. TODO: If valid, return success
    await this.prisma.otp.update({
      where: { id: verify.id },
      data: {
        verified: true,
      },
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
      },
    });

    return { message: 'User veried' };
  }

  // SignUp Password Entry Point
  async signupSetPassword(setPassword: SignupSetPasswordDto) {
    // Accept password and email
    const { email, password } = setPassword;

    // Verify email and get id
    const user = await this.prisma.user.findUnique({
      where: { email: email, isVerified: true },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    // Hash password and update user document
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
  }

  // Login method
  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // find user using prisma
    const prismaUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!prismaUser) {
      throw new UnauthorizedException('Wrong credentials');
    }

    if (!prismaUser.password) {
      throw new InternalServerErrorException();
    }

    // Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, prismaUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Generate JWT tokens
    const tokens = await this.generateUserTokens(prismaUser.id);
    return {
      ...tokens,
      userId: prismaUser.id,
    };
  }

  // Chnage password method
  async changePassword(userId, oldPassword: string, newPassword: string) {
    // Find user using prisma
    const prismaUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!prismaUser || !prismaUser.password) {
      throw new NotFoundException('User not found...');
    }

    // Compare the old password with the password in DB
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      prismaUser.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Change user's password to hashed password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in prisma as well
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: newHashedPassword },
    });
  }

  // Forgot password method
  async forgotPassword(email: string) {
    // Check that user exists in prisma
    const prismaUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (prismaUser) {
      // If user exists, generate password reset link
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry

      const resetToken = nanoid(64);

      await this.prisma.resetToken.upsert({
        where: { userId: prismaUser.id },
        update: {
          token: resetToken,
          expiresAt: expiryDate,
        },
        create: {
          token: resetToken,
          userId: prismaUser.id,
          expiresAt: expiryDate,
        },
      });

      // Send the link to the user by email (using nodemailer/ SES/ etc...)
      this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If this user exists, they will recive an email' };
  }

  // Reset password method
  async resetPassword(newPassword: string, resetToken: string) {
    // Find a valid reset token with prisma
    const token = await this.prisma.resetToken.findUnique({
      where: { token: resetToken, expiresAt: { gte: new Date() } },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    } else {
      await this.prisma.resetToken.delete({
        where: { token: resetToken },
      });
    }

    // Change user password with hashed in prisma
    const prismaUser = await this.prisma.user.findUnique({
      where: { id: token.userId },
    });
    if (!prismaUser) {
      throw new InternalServerErrorException();
    }

    // Hashed password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: prismaUser.id },
      data: {
        password: newHashedPassword,
      },
    });
  }

  // Generate 6-digit otp method
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Refresh token method
  async refreshTokens(refreshToken: string) {
    // Find the refresh token document with prisma
    const token = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken, expiresAt: { gte: new Date() } },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return this.generateUserTokens(token.userId);
  }

  // Generate user token method
  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '24h' });
    const refreshToken = uuidv4();

    await this.storeRefereshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  // Store refresh token method
  async storeRefereshToken(token: string, userId) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    // for upsert operation in prisma
    await this.prisma.refreshToken.upsert({
      where: { userId: userId },
      update: {
        token: token,
        expiresAt: expiryDate,
      },
      create: {
        userId: userId,
        token: token,
        expiresAt: expiryDate,
      },
    });
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message = 'Too many request') {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}

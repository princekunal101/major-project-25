import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { generateSignupOtp } from './templates/signup-otp.template';
import { generateResetOtp } from './templates/reset-password-otp.template';
import { generateResetPasswordDeeplink } from './templates/reset-password-deeplink';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  // TODO: Send OTP Email
  async sendOtpEmail(to: string, otp: string) {
    const mailOptions = {
      from: `Major Project <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Here's Your App Verification Code",
      html: generateSignupOtp(to, otp),
      replyTo: `Major Project <${process.env.EMAIL_USER}>`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  // TODO: Send passeord reset OTP email
  async sendResetOtpEmail(to: string, otp: string) {
    const mailOptions = {
      from: `Major Project <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Here's Your App Password Reset Verification Code",
      html: generateResetOtp(to, otp),
      replyTo: `Major Project <${process.env.EMAIL_USER}>`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  // Send password reset email
  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;
    const mailOptions = {
      from: `Major Project <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Here's Your App Password Reset Link",
      html: generateResetPasswordDeeplink(to, resetLink),
      replyTo: `Major Project <${process.env.EMAIL_USER}>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

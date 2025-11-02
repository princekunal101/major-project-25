import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // TODO: Send OTP Email
  async sendOtpEmail(to: string, otp: string) {
    const mailOptions = {
      from: `Send OTP service <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Your OTP Code',
      html: `<p>Hi,</br> Someone tried to sign up for an YourAppName account with ${to}. If it was you, enter this confirmation code in the app:</br> <b>${otp}</b> </p></br><p>This code is valid for 15 minutes.</p>`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  // Send password reset email
  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;
    const mailOptions = {
      from: `Auth-backend service <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

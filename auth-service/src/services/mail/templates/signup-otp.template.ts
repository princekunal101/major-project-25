export function generateSignupOtp(userEmail: string, otpCode: string): string {
  return `
    <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f7fa; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="480" cellpadding="0" cellspacing="0" border="0"
                        style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
                        <!-- Header -->
                        <tr>
                            <td align="center" style="background-color: #5374bc; padding: 20px 0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Email Verification<br>Social
                                    Media Platform</h1>
                            </td>
                        </tr>

                        <!-- Message Body -->
                        <tr>
                            <td style="padding: 30px 40px; color: #555; line-height: 1.6;">
                                <p style="margin: 0 0 15px 0;">Hi,</p>
                                <p style="margin: 0 0 20px 0;">
                                    Someone tried to sign up for a Social Media Platform account with
                                    <a href="mailto:${userEmail}"
                                        style="color:#1a73e8;text-decoration:none;">${userEmail}</a>.
                                    If it was you, enter this confirmation code in the app:
                                </p>

                                <!-- OTP Section -->
                                <div style="text-align: center; margin: 25px 0;">
                                    <span style="
                        display: inline-block;
                        background-color: #f0f4ff;
                        border: 2px dashed #2563eb;
                        color: #1e40af;
                        font-size: 28px;
                        font-weight: bold;
                        letter-spacing: 4px;
                        padding: 12px 25px;
                        border-radius: 8px;
                    ">
                                        ${otpCode}
                                    </span>
                                </div>

                                <p style="margin: 20px 0; color: #555;">
                                    This OTP is valid for the next <strong>15 minutes</strong>.
                                    If you didn't request a password reset, you can safely ignore this email.
                                </p>

                                <p style="margin-top: 25px;">Thanks,<br /><strong>The Social Media Team</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="background-color: #f0f0f0; padding: 15px 10px;">
                                <p style="font-size: 12px; color: #777777; margin: 0;">
                                    © 2025 Social Media Platform. All rights reserved.
                                </p>
                                <p style="font-size: 12px; color: #777777; margin: 5px 0 0 0;">
                                    This message was sent to <a href="mailto:${userEmail}"
                                        style="color: #2563eb; text-decoration: none;">${userEmail}</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>`;
}

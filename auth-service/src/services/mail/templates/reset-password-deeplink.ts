export function generateResetPasswordDeeplink(
  userEmail: string,
  resetLink: string,
): string {

  return `<body style="margin:0;padding:0;background-color:#fff7f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <!-- Outer container -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff7f0;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <!-- Email body -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="background-color:#fff8f3;border-radius:4px;padding:32px;">
          <tr>
            <td style="padding:0 12px;color:#222;">
              <!-- Greeting -->
              <p style="margin:0 0 20px 0;font-size:28px;line-height:34px;color:#222;text-align:left;">
                Dear Customer,
              </p>
              <!-- Message -->
              <p style="margin:0 0 28px 0;font-size:18px;line-height:28px;color:#2b2b2b;text-align:left;">
                You have requested to reset your password and an email has been sent to reset your password. Please
                click the button below to finish resetting your password.
              </p>

              <!-- Reset Button -->
              <table cellpadding="0" cellspacing="0" align="center" role="presentation"
                style="margin:22px auto 28px auto;">
                <tr>
                  <td align="center">
                    <a href=${resetLink} target="_blank" style="
                      display:inline-block;
                      text-decoration:none;
                      padding:16px 46px;
                      font-size:18px;
                      line-height:22px;
                      border-radius:40px;
                      background-color:#0078ff;
                      color:#ffffff;
                      font-weight:500;
                      font-family:'Helvetica Neue',Arial,sans-serif;
                      text-align:center;
                      -webkit-text-size-adjust:none;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <!-- Fallback Link -->
              <p style="margin:0 0 8px 0;font-size:16px;line-height:24px;color:#4a4a4a;text-align:center;">
                If the button above doesn't work, enter the address below in your browser.
              </p>

              <!-- Reset Link -->
              <p
                style="margin:10px 0 32px 0;font-size:16px;line-height:22px;color:#1a73e8;word-break:break-all;text-align:center;">
                <a href=${resetLink} target="_blank"
                  style="color:#1a73e8;text-decoration:none;word-break:break-word;">
                  ${resetLink}
                </a>
              </p>
              <!-- Note about validity -->
              <p style="margin:0 0 18px 0;font-size:16px;line-height:24px;color:#5a5a5a;text-align:left;">
                This password reset link is only valid for <strong style="font-weight:600;color:#333;">5
                  minutes</strong> after you receive this email.<br>
                If you didn't ask us to reset your password, reset it now to keep your account secure.
              </p>
              <!-- Signature -->
              <p style="margin:28px 0 0 0;font-size:16px;line-height:24px;color:#333;text-align:left;">
                Your Major Project G-33 account team.
              </p>

            </td>
          </tr>
          <!-- Footer spacing -->
          <tr>
            <td style="padding-top:26px;padding-bottom:12px;">
              <hr style="border:none;border-top:1px solid rgba(0,0,0,0.06);margin:0;">
            </td>
          </tr>

          <tr>
            <td style="padding:12px 12px 20px 12px;color:#888;font-size:12px;line-height:18px;text-align:center;">
              © <span id="year"></span> Major Project G-33. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

  <script>
    try { document.getElementById('year').textContent = new Date().getFullYear(); } catch (e) { }
  </script>
</body>`;
}

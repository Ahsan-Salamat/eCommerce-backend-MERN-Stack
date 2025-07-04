const resetPasswordEmail = (resetLink, userName = "User") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px;">
          <tr>
            <td>
              <h2 style="color:#333333;">Reset Your Password</h2>
              <p style="font-size:16px; color:#555;">Hello ${userName},</p>
              <p style="font-size:16px; color:#555;">We received a request to reset your password. Click the button below to create a new one:</p>
              <p style="text-align:center; margin:30px 0;">
                <a href="${resetLink}" style="background-color:#4CAF50; color:white; text-decoration:none; padding:12px 20px; border-radius:5px; font-size:16px;">
                  Reset Password
                </a>
              </p>
              <p style="font-size:14px; color:#777;">If you didn’t request this, just ignore this email.</p>
              <p style="margin-top:30px; font-size:14px; color:#555;">Thanks,<br/>The E-Commerce Team</p>
              <hr style="margin:30px 0; border:none; border-top:1px solid #eee;">
              <p style="font-size:12px; color:#aaa; text-align:center;">&copy; 2025 E-Commerce Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
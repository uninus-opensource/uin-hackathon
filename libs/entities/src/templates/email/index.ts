export function emailTemplate(name: string, link: string): string {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Verifikasi Email</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                padding: 0;
                margin: 0;
                text-align: center;
              }
          
              table {
                width: 100%;
                background-color: #fff;
              }
          
              .container {
                max-width: 650px;
                margin: auto;
                background-color: #f0f0f0;
                padding: 30px;
                border-radius: 4px;
              }
          
              .logo {
                padding: 20px;
                background-color: #08690c;
              }
          
              h1 {
                font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif;
                font-size: 28px;
                font-weight: 300;
                color: #666;
                margin: 0;
                padding-bottom: 1em;
                text-align: left;
              }
          
              p {
                font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif;
                font-size: 18px;
                color: #666;
                margin: 0;
                line-height: 24px;
                text-align: left;
                padding-bottom: 3%;
              }
          
              .footer {
                background-color: #f0f0f0;
                padding: 20px 40px;
                text-align: center;
              }
          
              .footer p {
                font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif;
                font-size: 12px;
                color: #777;
                margin: 0;
                line-height: 24px;
              }
          
              .footer a {
                color: #777;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f0f0f0">
              <tr>
                <td style="padding: 30px 30px 20px 30px;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
                    <tr>
                      <td colspan="2" align="center" class="logo">
                        <a href="https://uninus.ac.id" target="_blank"><img src="https://i0.wp.com/uninus.ac.id/wp-content/uploads/2023/09/Neo-Uninus.png?resize=300" border="0" style="width: 180px;" /></a>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                        <h1>Verifikasi OTP</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding: 0px 50px;" valign="top">
                        <p>Hi ${name},</p>
                        <p></p>
                        <p><b>${link}</b></p>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                        <p>Silahkan gunakan magic link ini untuk verifikasi email</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" align="center" class="footer">
                        <p>
                          <a href="https://uninus.ac.id" target="_blank">UNIVERSITAS ISLAM NUSANTARA</a>
                          <br>
                          Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;
}

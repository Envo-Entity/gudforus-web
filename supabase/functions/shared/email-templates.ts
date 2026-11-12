/**
 * Email Templates
 *
 * Single source of truth for all outbound email HTML.
 * Each exported function accepts template variables and returns a
 * { subject, html } payload ready to pass to the Resend API.
 *
 * Template variables in HTML use {{double_braces}} convention.
 * Source designs live in gudforus-web/emails/ — sync changes here
 * whenever the design is updated.
 */

// ─── Welcome ──────────────────────────────────────────────────────────────────

const WELCOME_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Welcome to Gud</title>

    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;500&display=swap"
      rel="stylesheet"
      type="text/css"
    />

    <style type="text/css">
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; }
      table { border-collapse: collapse !important; }
      body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
      a[x-apple-data-detectors], u + #body a, #MessageViewBody a { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
      .playfair { font-family: "Playfair Display", Georgia, "Times New Roman", Times, serif !important; }
      .inter { font-family: "Inter", Arial, Helvetica, sans-serif !important; }
      @media screen and (max-width: 600px) {
        .email-container { width: 100% !important; max-width: 100% !important; }
        .header-cell { padding-top: 16px !important; padding-bottom: 0 !important; padding-left: 24px !important; padding-right: 24px !important; }
        .h1 { font-size: 30px !important; line-height: 1.2 !important; }
        .subtitle { font-size: 14px !important; }
        .footer-cell { padding-left: 24px !important; padding-right: 24px !important; padding-top: 32px !important; padding-bottom: 32px !important; }
        .store-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; margin-bottom: 10px !important; }
        .store-table { width: 100% !important; }
        .store-td { display: block !important; width: 100% !important; padding-right: 0 !important; padding-left: 0 !important; }
      }
      @media (prefers-color-scheme: dark) {
        .dm-bg { background-color: #141a0e !important; }
        .dm-card { background-color: #1c2b14 !important; }
        .dm-h1 { color: #f5f0e8 !important; }
        .dm-sub { color: #8fab7a !important; }
        .dm-divider { border-color: #2e4421 !important; }
        .dm-footer { background-color: #0e160a !important; }
        .dm-btn-bg { background-color: #2e4421 !important; }
        .dm-btn-text { color: #c4d9b0 !important; }
        .dm-link { color: #8fab7a !important; }
      }
    </style>
  </head>

  <body id="body" style="margin:0;padding:0;background-color:#f9f4f0;-webkit-text-size-adjust:none;text-size-adjust:none;">

    <!-- Preview text -->
    <div aria-hidden="true" style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#ede8de;opacity:0;">
      You now know what's in everything you eat, scan, and apply. Welcome to Gud.&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="dm-bg" style="background-color:#f9f4f0">
      <tr>
        <td align="center" valign="top" style="padding:0">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width:800px;width:100%">

            <!-- Header -->
            <tr>
              <td align="center" valign="top" class="header-cell" style="background-color:#f9f4f0 !important;padding-top:20px;padding-bottom:0;padding-left:40px;padding-right:40px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- Logo -->
                  <tr>
                    <td align="center" style="padding-bottom:16px">
                      <a href="https://gudforus.com" target="_blank" style="text-decoration:none;display:inline-block">
                        <img src="https://gudforus.com/gud-green.png" alt="Gud" width="216" height="120" style="display:block;border:0;width:216px;height:auto;-ms-interpolation-mode:bicubic;" />
                      </a>
                    </td>
                  </tr>
                  <!-- Hi, name -->
                  <tr>
                    <td align="center" style="padding-bottom:0">
                      <h1 class="h1 playfair" style="margin:0;font-family:&quot;Playfair Display&quot;,Georgia,&quot;Times New Roman&quot;,Times,serif;font-size:38px;font-weight:700;line-height:1.15;color:#1c2b14;letter-spacing:-0.5px;">
                        Hi, {{name}}.
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Image 1 -->
            <tr>
              <td align="center" valign="top" style="padding:0;line-height:0;font-size:0;background-color:#ede8de;">
                <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                  <img src="https://gudforus.com/email/1.jpg" alt="The most powerful health decisions are the ones you take at the grocery store — Gud gives you a compatibility score, ingredient breakdown, and personalised insights for every product." width="600" height="800" style="display:block;width:100%;max-width:100%;height:auto;border:0;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>

            <!-- Image 2 -->
            <tr>
              <td align="center" valign="top" style="padding:0;line-height:0;font-size:0;background-color:#ede8de;">
                <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                  <img src="https://gudforus.com/email/2.jpg" alt="A small swap, a big difference — Gud scans both products and shows you the healthier choice with an Overall Health Score." width="600" height="800" style="display:block;width:100%;max-width:100%;height:auto;border:0;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>

            <!-- Image 3 -->
            <tr>
              <td align="center" valign="top" style="padding:0;line-height:0;font-size:0;background-color:#ede8de;">
                <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                  <img src="https://gudforus.com/email/3.jpg" alt="Some ingredients belong nowhere near your skin — Gud reveals hormone-disrupting chemicals hidden in everyday cosmetics and gives you a Cosmetic Score." width="600" height="800" style="display:block;width:100%;max-width:100%;height:auto;border:0;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>

            <!-- Image 4 -->
            <tr>
              <td align="center" valign="top" style="padding:0;line-height:0;font-size:0;background-color:#ede8de;">
                <a href="https://gudforus.com/profile" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                  <img src="https://gudforus.com/email/4.jpg" alt="Complete your profile — your health scores get sharper the more Gud knows you. Takes less than 60 seconds." width="600" height="800" style="display:block;width:100%;max-width:100%;height:auto;border:0;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>

            <!-- Image 5 -->
            <tr>
              <td align="center" valign="top" style="padding:0;line-height:0;font-size:0;background-color:#ede8de;">
                <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                  <img src="https://gudforus.com/email/5.jpg" alt="Next time you're shopping, you wouldn't have to guess — you'll know. Open Gud and start scanning." width="600" height="800" style="display:block;width:100%;max-width:100%;height:auto;border:0;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" valign="top" class="footer-cell dm-footer" style="background-color:#1c2b14;padding-top:40px;padding-bottom:40px;padding-left:40px;padding-right:40px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

                  <!-- Download the app -->
                  <tr>
                    <td align="center" style="padding-bottom:8px">
                      <p class="inter" style="margin:0 0 20px 0;font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;line-height:1;color:#6b8f52;letter-spacing:2px;text-transform:uppercase;">
                        Download the app
                      </p>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="store-table">
                        <tr>
                          <td align="right" valign="middle" class="store-td" style="padding-right:6px">
                            <a href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992" target="_blank" class="store-btn" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                              <img src="https://gudforus.com/email/appstore.svg" alt="Download on the App Store" width="120" height="40" style="display:block;border:0;width:120px;height:40px;" />
                            </a>
                          </td>
                          <td align="left" valign="middle" class="store-td" style="padding-left:6px">
                            <a href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN" target="_blank" class="store-btn" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                              <img src="https://gudforus.com/email/playstore.svg" alt="Get it on Google Play" width="120" height="40" style="display:block;border:0;width:120px;height:40px;" />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding-top:28px;padding-bottom:28px">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr><td class="dm-divider" style="border-top:1px solid #2e4421;font-size:0;line-height:0;">&nbsp;</td></tr>
                      </table>
                    </td>
                  </tr>

                  <!-- From our blog -->
                  <tr>
                    <td align="center" style="padding-bottom:28px">
                      <p class="inter" style="margin:0 0 14px 0;font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;line-height:1;color:#6b8f52;letter-spacing:2px;text-transform:uppercase;">
                        From our blog
                      </p>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding-bottom:8px">
                            <a href="https://gudforus.com/blog/why-ingredient-lists-are-hard-to-understand" target="_blank" class="inter dm-link" style="font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#b8d4a0;text-decoration:underline;text-underline-offset:3px;line-height:1.5;"><span style="color:#b8d4a0;">Why Ingredient Lists Are Hard to Understand &rarr;</span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-bottom:8px">
                            <a href="https://gudforus.com/blog/allergy-ingredient-checker" target="_blank" class="inter dm-link" style="font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#b8d4a0;text-decoration:underline;text-underline-offset:3px;line-height:1.5;"><span style="color:#b8d4a0;">How to Check if a Product Is Safe for Your Allergy &rarr;</span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <a href="https://gudforus.com/blog/blueberries-superfood" target="_blank" class="inter dm-link" style="font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#b8d4a0;text-decoration:underline;text-underline-offset:3px;line-height:1.5;"><span style="color:#b8d4a0;">Blueberries: The Superfood You Don't Have to Try Hard to Eat &rarr;</span>
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding-bottom:28px">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr><td class="dm-divider" style="border-top:1px solid #2e4421;font-size:0;line-height:0;">&nbsp;</td></tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Wordmark -->
                  <tr>
                    <td align="center" style="padding-bottom:12px">
                      <a href="https://gudforus.com" target="_blank" class="inter" style="font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#f5f0e8;text-decoration:none;letter-spacing:-0.3px;"><span style="color:#f5f0e8;text-decoration:none;">gudforus.com</span>
                      </a>
                    </td>
                  </tr>

                  <!-- Tagline -->
                  <tr>
                    <td align="center" style="padding-bottom:24px">
                      <p class="inter" style="margin:0;font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;line-height:1.6;color:#4a6e35;">
                        Shop smarter. Eat better. Feel good.
                      </p>
                    </td>
                  </tr>

                  <!-- Unsubscribe -->
                  <tr>
                    <td align="center">
                      <a href="{{unsubscribe_url}}" target="_blank" class="inter" style="font-family:&quot;Inter&quot;,Arial,Helvetica,sans-serif;font-size:11px;font-weight:400;color:#8fab7a;text-decoration:underline;text-underline-offset:2px;letter-spacing:0.3px;"><span style="color:#8fab7a;">Unsubscribe from these emails</span>
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export function renderWelcomeEmail(
  firstName: string,
  unsubscribeUrl: string,
): { subject: string; html: string } {
  return {
    subject: `Welcome to Gud, ${firstName} 🌿`,
    html: WELCOME_TEMPLATE
      .replace(/\{\{name\}\}/g, firstName)
      .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl),
  };
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

const NEWSLETTER_WRAPPER = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>{{subject}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet" type="text/css" />
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; height:auto; line-height:100%; outline:none; text-decoration:none; display:block; }
    table { border-collapse:collapse !important; }
    body { height:100% !important; margin:0 !important; padding:0 !important; width:100% !important; }
    a[x-apple-data-detectors], u + #body a, #MessageViewBody a { color:inherit !important; text-decoration:none !important; font-family:inherit !important; }
    .playfair { font-family:"Playfair Display",Georgia,"Times New Roman",Times,serif !important; }
    .inter { font-family:"Inter",Arial,Helvetica,sans-serif !important; }
    .nl-body { font-family:"Inter",Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7; color:#2d2d2d; }
    .nl-body h2 { font-family:"Playfair Display",Georgia,serif; font-size:22px; font-weight:700; color:#1c2b14; margin:28px 0 10px; }
    .nl-body h3 { font-family:"Inter",Arial,Helvetica,sans-serif; font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; color:#4a6c48; margin:24px 0 8px; }
    .nl-body p { margin:0 0 16px; }
    .nl-body a { color:#4a6c48; text-decoration:underline; text-underline-offset:3px; }
    .nl-body ul, .nl-body ol { margin:0 0 16px; padding-left:20px; }
    .nl-body li { margin-bottom:6px; }
    .nl-body strong { font-weight:600; color:#1c2b14; }
    .nl-body hr { border:0; border-top:1px solid #e5e3dd; margin:24px 0; }
    @media screen and (max-width:600px) {
      .email-container { width:100% !important; }
      .content-cell { padding:32px 24px !important; }
      .footer-cell { padding:32px 24px !important; }
    }
    @media (prefers-color-scheme: dark) {
      .dm-bg { background-color:#141a0e !important; }
      .dm-card { background-color:#f9f4f0 !important; }
      .dm-footer { background-color:#0e160a !important; }
      .dm-link { color:#8fab7a !important; }
    }
  </style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#f9f4f0;-webkit-text-size-adjust:none;text-size-adjust:none;">

  <!-- Preview -->
  <div aria-hidden="true" style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f9f4f0;opacity:0;">{{preview_text}}&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;</div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="dm-bg" style="background-color:#f9f4f0;">
    <tr>
      <td align="center" valign="top" style="padding:0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width:680px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#1c2b14;padding:24px 40px 20px;">
              <a href="https://gudforus.com" target="_blank" style="text-decoration:none;">
                <img src="https://gudforus.com/gud-green.png" alt="Gud" width="108" height="60" style="display:block;width:108px;height:auto;border:0;" />
              </a>
            </td>
          </tr>

          <!-- Issue label bar -->
          <tr>
            <td align="center" style="background-color:#2e4421;padding:8px 40px;">
              <p class="inter" style="margin:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#8fab7a;">
                {{issue_label}}
              </p>
            </td>
          </tr>

          <!-- Subject / title -->
          <tr>
            <td align="center" class="dm-card" style="background-color:#f9f4f0;padding:40px 48px 8px;">
              <h1 class="playfair" style="margin:0;font-family:'Playfair Display',Georgia,'Times New Roman',Times,serif;font-size:32px;font-weight:700;line-height:1.2;color:#1c2b14;letter-spacing:-0.3px;">
                {{subject}}
              </h1>
            </td>
          </tr>

          <!-- Greeting line -->
          <tr>
            <td class="content-cell dm-card" style="background-color:#f9f4f0;padding:16px 48px 0;">
              <p class="inter" style="margin:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:#6b8f52;">
                Hi {{name}},
              </p>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td class="content-cell nl-body dm-card" style="background-color:#f9f4f0;padding:20px 48px 48px;">
              {{body_html}}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="footer-cell dm-footer" style="background-color:#1c2b14;padding:40px 48px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

                <!-- Wordmark -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <a href="https://gudforus.com" target="_blank" class="inter" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#f5f0e8;text-decoration:none;letter-spacing:-0.3px;">
                      <span style="color:#f5f0e8;">gudforus.com</span>
                    </a>
                  </td>
                </tr>

                <!-- Tagline -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <p class="inter" style="margin:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#4a6e35;">
                      Shop smarter. Eat better. Feel good.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr><td style="border-top:1px solid #2e4421;font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Unsubscribe -->
                <tr>
                  <td align="center">
                    <a href="{{unsubscribe_url}}" target="_blank" class="inter dm-link" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#8fab7a;text-decoration:underline;text-underline-offset:2px;letter-spacing:0.3px;">
                      <span style="color:#8fab7a;">Unsubscribe from these emails</span>
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export function renderNewsletterEmail(
  firstName: string,
  subject: string,
  bodyHtml: string,
  unsubscribeUrl: string,
  issueLabel = "Gudforus Newsletter",
): { subject: string; html: string } {
  const previewText = subject;
  const html = NEWSLETTER_WRAPPER
    .replace(/\{\{subject\}\}/g, subject)
    .replace(/\{\{name\}\}/g, firstName)
    .replace(/\{\{body_html\}\}/g, bodyHtml)
    .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl)
    .replace(/\{\{issue_label\}\}/g, issueLabel)
    .replace(/\{\{preview_text\}\}/g, previewText);
  return { subject, html };
}

// ─── Others in Health Profile ──────────────────────────────────────────────────

const OTHERS_IN_HEALTH_PROFILE_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Add Anything to Your Health Profile</title>

    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet" type="text/css" />

    <style type="text/css">
        /* Apple Link Detection Fix */
        a[x-apple-data-detectors],
        u + #body a,
        #MessageViewBody a {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* Mobile Responsive Rules */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .header-cell { padding-left: 24px !important; padding-right: 24px !important; }
            .footer-cell { padding-top: 32px !important; padding-bottom: 32px !important; padding-left: 24px !important; padding-right: 24px !important; }
            .store-badge-cell { display: block !important; width: 100% !important; padding-right: 0 !important; }
            .store-badge { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
        }
    </style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#f6f1ee;-webkit-text-size-adjust:none;text-size-adjust:none;">

    <!-- Preheader (Hidden Preview Text) -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f6f1ee;opacity:0;">
        Not on our list? Just type it — custom health details are here.&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
    </div>

    <!-- Outer Wrapper -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f1ee" style="border-collapse:collapse !important;">
        <tr>
            <td align="center">

                <!-- Inner Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#f6f1ee" class="email-container" style="border-collapse:collapse !important;width:600px;">

                    <!-- Header Section -->
                    <tr>
                        <td align="center" class="header-cell" style="padding:40px 40px 0 40px;background-color:#f6f1ee;">
                            <a href="https://gudforus.com" target="_blank" style="text-decoration:none;display:inline-block;">
                                <img
                                    src="https://gudforus.com/gud-green.png"
                                    alt="Gud"
                                    width="216"
                                    style="display:block;border:0;width:216px;height:auto;-ms-interpolation-mode:bicubic;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 1 -->
                    <tr>
                        <td align="center" style="padding:32px 0 0 0;background-color:#f6f1ee;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <img
                                                                src="https://gudforus.com/email/others_in_health_profile/others_1.jpg"
                                                                alt="Not on our list? Just type it. We've added custom options so your profile fits you perfectly and your insights get even better."
                                                                width="600"
                                                                style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;"
                                                            />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 2 -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#f6f1ee;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <img
                                                                src="https://gudforus.com/email/others_in_health_profile/others_2.jpg"
                                                                alt="Made for real life, not just checkboxes. Add custom conditions, allergies, sensitivities, dietary preferences, or skin concerns — whatever matters to you."
                                                                width="600"
                                                                style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;"
                                                            />
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="left" bgcolor="#1c2b14" class="footer-cell" style="padding:40px 40px 40px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">

                                <!-- App Badges -->
                                <tr>
                                    <td align="left" style="padding-bottom:20px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            DOWNLOAD THE APP
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td class="store-badge-cell" align="left" style="padding-right:6px;">
                                                    <a href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992" target="_blank" class="store-badge" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                                                        <img src="https://gudforus.com/email/appstore.svg" alt="Download on the App Store" width="120" height="40" style="display:block;border:0;width:120px;height:40px;-ms-interpolation-mode:bicubic;" />
                                                    </a>
                                                </td>
                                                <td class="store-badge-cell" align="left">
                                                    <a href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN" target="_blank" class="store-badge" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                                                        <img src="https://gudforus.com/email/playstore.svg" alt="Get it on Google Play" width="120" height="40" style="display:block;border:0;width:120px;height:40px;-ms-interpolation-mode:bicubic;" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td style="border-top:1px solid #2e4421;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Blog Links -->
                                <tr>
                                    <td align="left" style="padding-bottom:14px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            FROM OUR BLOG
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-bottom:8px;">
                                        <a href="https://gudforus.com/blog/why-ingredient-lists-are-hard-to-understand" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">Why Ingredient Lists Are Hard to Understand &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-bottom:8px;">
                                        <a href="https://gudforus.com/blog/allergy-ingredient-checker" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">How to Check if a Product Is Safe for Your Allergy &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="https://gudforus.com/blog/blueberries-superfood" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">Blueberries: The Superfood You Don't Have to Try Hard to Eat &rarr;</span>
                                        </a>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td style="border-top:1px solid #2e4421;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Wordmark, Tagline, Unsubscribe -->
                                <tr>
                                    <td align="left">
                                        <a href="https://gudforus.com" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#f5f0e8;text-decoration:none;letter-spacing:-0.3px;line-height:1.2;">
                                            gudforus.com
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-top:12px;padding-bottom:24px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#4a6e35;line-height:1.5;">
                                            Shop smarter. Eat better. Feel good.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="{{unsubscribe_url}}" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:2px;letter-spacing:0.3px;">
                                            <span style="color:#f5f0e8;">Unsubscribe from these emails</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
                <!-- End Inner Container -->

            </td>
        </tr>
    </table>
    <!-- End Outer Wrapper -->

</body>
</html>`;

export function renderOthersInHealthProfileEmail(
  firstName: string,
  unsubscribeUrl: string,
): { subject: string; html: string } {
  return {
    subject: `Hi ${firstName}, Any Health Condition, we got you!`,
    html: OTHERS_IN_HEALTH_PROFILE_TEMPLATE.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl),
  };
}

// ─── Pro 50% Off ──────────────────────────────────────────────────────────────

const PRO_50_OFF_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>50% Off Gud Pro</title>

    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" type="text/css" />

    <style type="text/css">
        /* Apple Link Detection Fix */
        a[x-apple-data-detectors],
        u + #body a,
        #MessageViewBody a {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* Mobile Responsive Rules */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .header-cell { padding-left: 24px !important; padding-right: 24px !important; }
            .offer-cell { padding-left: 24px !important; padding-right: 24px !important; }
            .offer-badge { font-size: 34px !important; letter-spacing: 6px !important; }
            .closing-cell { padding-left: 24px !important; padding-right: 24px !important; }
            .closing-heading { font-size: 26px !important; }
            .footer-cell { padding-top: 32px !important; padding-bottom: 32px !important; padding-left: 24px !important; padding-right: 24px !important; }
            .store-badge-cell { display: block !important; width: 100% !important; padding-right: 0 !important; }
            .store-badge { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
        }
    </style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#f6f1ee;-webkit-text-size-adjust:none;text-size-adjust:none;">

    <!-- Preheader (Hidden Preview Text) -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f6f1ee;opacity:0;">
        Your 50% off Gud Pro is waiting. One tap and it's yours.&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
    </div>

    <!-- Outer Wrapper -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f1ee" style="border-collapse:collapse !important;">
        <tr>
            <td align="center">

                <!-- Inner Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#f6f1ee" class="email-container" style="border-collapse:collapse !important;width:600px;">

                    <!-- Header Section -->
                    <tr>
                        <td align="center" class="header-cell" style="padding:40px 40px 0 40px;background-color:#f6f1ee;">
                            <a href="https://gudforus.com" target="_blank" style="text-decoration:none;display:inline-block;">
                                <img
                                    src="https://gudforus.com/gud-green.png"
                                    alt="Gud"
                                    width="216"
                                    style="display:block;border:0;width:216px;height:auto;-ms-interpolation-mode:bicubic;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 1: Hero -->
                    <tr>
                        <td align="center" style="padding:32px 0 0 0;background-color:#f6f1ee;font-size:0;line-height:0;">
                            <a href="https://gudforus.com/perk/ngme3k" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <img
                                    src="https://gudforus.com/email/pro_50_off/pro_50_off_1.jpg"
                                    alt="50% off Gud Pro. Healthier choices, half the price. Scan anything, know what's in it, and find something better."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Offer -->
                    <tr>
                        <td align="center" class="offer-cell" style="padding:40px 40px 8px 40px;background-color:#f6f1ee;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="border-collapse:separate !important;background-color:#ffffff;border-radius:20px;">
                                <tr>
                                    <td align="center" style="padding:32px 28px 32px 28px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            YOUR OFFER
                                        </p>

                                        <!-- Offer Badge -->
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate !important;margin-top:16px;">
                                            <tr>
                                                <td align="center" bgcolor="#f5f0e8" style="padding:16px 32px;background-color:#f5f0e8;border:2px dashed #6b8f52;border-radius:14px;">
                                                    <span class="offer-badge" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:40px;font-weight:600;color:#1c2b14;letter-spacing:8px;line-height:1.1;">50%&nbsp;OFF</span>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin:20px 0 0 0;padding:0;font-family:'Playfair Display',Georgia,'Times New Roman',Times,serif;font-size:24px;font-weight:700;color:#1c2b14;letter-spacing:-0.3px;line-height:1.25;">
                                            Gud Pro, <em style="font-family:'Playfair Display',Georgia,'Times New Roman',Times,serif;font-weight:400;font-style:italic;color:#4a6e35;">at&nbsp;half&nbsp;the&nbsp;price.</em>
                                        </p>
                                        <p style="margin:10px 0 0 0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;font-weight:400;color:#1c2b14;line-height:1.6;">
                                            {{name}}, you've seen what 5 free scans can do. Pro makes every scan count, with unlimited scans and a healthier pick every time you shop.
                                        </p>

                                        <!-- CTA Button -->
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate !important;margin-top:24px;">
                                            <tr>
                                                <td align="center" bgcolor="#4a6e35" style="border-radius:12px;background-color:#4a6e35;">
                                                    <a href="https://gudforus.com/perk/ngme3k" target="_blank" style="display:inline-block;padding:15px 36px;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;border-radius:12px;line-height:1.2;">
                                                        <span style="color:#ffffff;">Get 50% off &rarr;</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin:16px 0 0 0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#6b7a62;line-height:1.5;">
                                            No code needed. Ends 30 November 2026. Cancel anytime.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Image 2: What Pro Does -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#f6f1ee;font-size:0;line-height:0;">
                            <a href="https://gudforus.com/perk/ngme3k" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <img
                                    src="https://gudforus.com/email/pro_50_off/pro_50_off_2.jpg"
                                    alt="Every scan, a smarter swap. Unlimited scans, a personal health match against your allergies and conditions, healthier alternatives on the shelf, and every ingredient explained."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Closing CTA -->
                    <tr>
                        <td align="center" class="closing-cell" style="padding:40px 40px 48px 40px;background-color:#f6f1ee;">
                            <p class="closing-heading" style="margin:0;padding:0;font-family:'Playfair Display',Georgia,'Times New Roman',Times,serif;font-size:30px;font-weight:700;color:#1c2b14;letter-spacing:-0.5px;line-height:1.2;">
                                Your next grocery run,<br /><em style="font-family:'Playfair Display',Georgia,'Times New Roman',Times,serif;font-weight:400;font-style:italic;color:#4a6e35;">your healthiest yet.</em>
                            </p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate !important;margin-top:24px;">
                                <tr>
                                    <td align="center" bgcolor="#4a6e35" style="border-radius:12px;background-color:#4a6e35;">
                                        <a href="https://gudforus.com/perk/ngme3k" target="_blank" style="display:inline-block;padding:15px 36px;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;border-radius:12px;line-height:1.2;">
                                            <span style="color:#ffffff;">Get 50% off &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="left" bgcolor="#1c2b14" class="footer-cell" style="padding:40px 40px 40px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">

                                <!-- App Badges -->
                                <tr>
                                    <td align="left" style="padding-bottom:20px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            DOWNLOAD THE APP
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td class="store-badge-cell" align="left" style="padding-right:6px;">
                                                    <a href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992" target="_blank" class="store-badge" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                                                        <img src="https://gudforus.com/email/appstore.svg" alt="Download on the App Store" width="120" height="40" style="display:block;border:0;width:120px;height:40px;-ms-interpolation-mode:bicubic;" />
                                                    </a>
                                                </td>
                                                <td class="store-badge-cell" align="left">
                                                    <a href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN" target="_blank" class="store-badge" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                                                        <img src="https://gudforus.com/email/playstore.svg" alt="Get it on Google Play" width="120" height="40" style="display:block;border:0;width:120px;height:40px;-ms-interpolation-mode:bicubic;" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td style="border-top:1px solid #2e4421;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Blog Links -->
                                <tr>
                                    <td align="left" style="padding-bottom:14px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            FROM OUR BLOG
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-bottom:8px;">
                                        <a href="https://gudforus.com/blog/why-ingredient-lists-are-hard-to-understand" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">Why Ingredient Lists Are Hard to Understand &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-bottom:8px;">
                                        <a href="https://gudforus.com/blog/allergy-ingredient-checker" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">How to Check if a Product Is Safe for Your Allergy &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="https://gudforus.com/blog/blueberries-superfood" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">Blueberries: The Superfood You Don't Have to Try Hard to Eat &rarr;</span>
                                        </a>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td style="border-top:1px solid #2e4421;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Wordmark, Tagline, Unsubscribe -->
                                <tr>
                                    <td align="left">
                                        <a href="https://gudforus.com" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#f5f0e8;text-decoration:none;letter-spacing:-0.3px;line-height:1.2;">
                                            gudforus.com
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-top:12px;padding-bottom:16px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#4a6e35;line-height:1.5;">
                                            Shop smarter. Eat better. Feel good.
                                        </p>
                                    </td>
                                </tr>

                                <!-- Offer Terms -->
                                <tr>
                                    <td align="left" style="padding-bottom:24px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:400;color:#8fa87d;line-height:1.5;">
                                            50% off Gud Pro is valid until 30 November 2026 (IST) for Gud members without an active Pro subscription. The discount is applied in the Gud app through the App Store or Google Play.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="{{unsubscribe_url}}" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:2px;letter-spacing:0.3px;">
                                            <span style="color:#f5f0e8;">Unsubscribe from these emails</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
                <!-- End Inner Container -->

            </td>
        </tr>
    </table>
    <!-- End Outer Wrapper -->

</body>
</html>`;

export function renderPro50OffEmail(
  firstName: string,
  unsubscribeUrl: string,
): { subject: string; html: string } {
  return {
    subject: `${firstName}, 50% off Gud Pro — eat better for less`,
    html: PRO_50_OFF_TEMPLATE
      .replace(/\{\{name\}\}/g, firstName)
      .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl),
  };
}

// ─── New look (Season 2 redesign announcement) ───────────────────────────────
// Source: emails/new_look/email.html. Images are served from
// https://gudforus.com/email/new_look/new_look_{1..6}.jpg (public/email/new_look/).
// Template variables: {{name}}, {{unsubscribe_url}}, plus the per-variant slots in
// NEW_LOOK_COPY ({{intro}}, {{closing_image}}, {{closing_image_alt}}, {{closing_heading}},
// {{closing_line}}, {{small_print}}).

const NEW_LOOK_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!-- The slices carry their own #F0EFEA ground, so ask clients not to recolour the page in dark mode. -->
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>Gud has a new look</title>

    <!--
    CAMPAIGN: new_look
    Subject (pick one, see COPY.md):  Gud has a new look (and a blueberry with feelings)
    Preheader: below, in the hidden div.

    TEMPLATE VARIABLES
    {{name}}            → first name (intro line)
    {{unsubscribe_url}} → signed one-click unsubscribe link

    IMAGES: every src below is a TODO. Generate the slices from PROMPTS.md, put them in
    gud-for-us-app-web/public/email/new_look/ and deploy the web app before sending, so they are
    live at https://gudforus.com/email/new_look/new_look_N.jpg (same pattern as pro_50_off).
    -->

    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->

    <!-- DM Serif Display = the new look's display face. Falls back to Georgia where web fonts aren't supported (Gmail, Outlook). -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" type="text/css" />

    <style type="text/css">
        :root { color-scheme: light only; supported-color-schemes: light only; }

        /* Apple Link Detection Fix */
        a[x-apple-data-detectors],
        u + #body a,
        #MessageViewBody a {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* Mobile Responsive Rules */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .header-cell { padding-left: 24px !important; padding-right: 24px !important; }
            .text-cell { padding-left: 28px !important; padding-right: 28px !important; }
            .cta-heading { font-size: 28px !important; }
            .cta-btn-cell { display: block !important; width: 100% !important; padding: 0 0 12px 0 !important; }
            .cta-btn { display: block !important; text-align: center !important; }
            .footer-cell { padding-top: 32px !important; padding-bottom: 32px !important; padding-left: 24px !important; padding-right: 24px !important; }
            .store-badge-cell { display: block !important; width: 100% !important; padding-right: 0 !important; }
            .store-badge { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
        }
    </style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#F0EFEA;-webkit-text-size-adjust:none;text-size-adjust:none;">

    <!-- Preheader (Hidden Preview Text) -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F0EFEA;opacity:0;">
        Fresh new look, same honest answers. Plus: you can share your scans now.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>

    <!-- Outer Wrapper -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F0EFEA" style="border-collapse:collapse !important;background-color:#F0EFEA;">
        <tr>
            <td align="center">

                <!-- Inner Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#F0EFEA" class="email-container" style="border-collapse:collapse !important;width:600px;background-color:#F0EFEA;">

                    <!-- Header Section -->
                    <tr>
                        <td align="center" class="header-cell" style="padding:40px 40px 0 40px;background-color:#F0EFEA;">
                            <a href="https://gudforus.com" target="_blank" style="text-decoration:none;display:inline-block;">
                                <img
                                    src="https://gudforus.com/gud-green.png"
                                    alt="Gud"
                                    width="216"
                                    style="display:block;border:0;width:216px;height:auto;-ms-interpolation-mode:bicubic;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 1: Hero — slices/new_look_1.jpg (1200 × 1500) -->
                    <tr>
                        <td align="center" style="padding:24px 0 0 0;background-color:#F0EFEA;font-size:0;line-height:0;">
                            <!-- TODO: link target. gudforus.com for now; swap for an "open the app" smart link if one is built (see README). -->
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <!-- TODO: upload slices/new_look_1.jpg → public/email/new_look/new_look_1.jpg -->
                                <img
                                    src="https://gudforus.com/email/new_look/new_look_1.jpg"
                                    alt="Gud has a new look. Same honest answers, fresh everything else. Our blueberry mascot mid-hop, very pleased about it."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;color:#1C1C1A;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- HTML 1: Intro -->
                    <tr>
                        <td align="left" class="text-cell" style="padding:8px 56px 36px 56px;background-color:#F0EFEA;">
                            <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#1C1C1A;line-height:1.6;">
                                {{intro}}
                            </p>
                            <p style="margin:12px 0 0 0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#66655C;line-height:1.6;">
                                Here&rsquo;s the quick tour.
                            </p>
                        </td>
                    </tr>

                    <!-- Image 2: The new Home — slices/new_look_2.jpg (1200 × 1600) -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#F0EFEA;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <!-- TODO: upload slices/new_look_2.jpg → public/email/new_look/new_look_2.jpg -->
                                <img
                                    src="https://gudforus.com/email/new_look/new_look_2.jpg"
                                    alt="The new Gud Home screen on an iPhone: your Ingredient Health Score up front, your ingredient profile in Good, Okay and Bad, and your blueberry right next to your score."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1C1C1A;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 3: Meet your blueberry — slices/new_look_3.jpg (1200 × 1200) -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#F0EFEA;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <!-- TODO: upload slices/new_look_3.jpg → public/email/new_look/new_look_3.jpg -->
                                <img
                                    src="https://gudforus.com/email/new_look/new_look_3.jpg"
                                    alt="Meet your blueberry. Its mood follows your score: under 40 it holds its tummy, 40 to 69 it keeps a straight face, 70 and up it hops for joy."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1C1C1A;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 4: Share your scans — slices/new_look_4.jpg (1200 × 1500) -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#F0EFEA;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <!-- TODO: upload slices/new_look_4.jpg → public/email/new_look/new_look_4.jpg -->
                                <img
                                    src="https://gudforus.com/email/new_look/new_look_4.jpg"
                                    alt="Share your scans. Send any result to a friend, right from the scan screen. A shared scan with a Health Score of 76 out of 100, and a friend already typing back."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1C1C1A;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 5: Everything else, still here — slices/new_look_5.jpg (1200 × 800) -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#F0EFEA;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <!-- TODO: upload slices/new_look_5.jpg → public/email/new_look/new_look_5.jpg -->
                                <img
                                    src="https://gudforus.com/email/new_look/new_look_5.jpg"
                                    alt="Everything else? Still here. Scan it, check it against your health profile, and swap it for something better."
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1C1C1A;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- Image 6: Sign-off — per-variant image from NEW_LOOK_COPY.closing_image -->
                    <tr>
                        <td align="center" style="padding:0;background-color:#F0EFEA;font-size:0;line-height:0;">
                            <a href="https://gudforus.com" target="_blank" style="display:block;width:100%;text-decoration:none;line-height:0;font-size:0;">
                                <img
                                    src="{{closing_image}}"
                                    alt="{{closing_image_alt}}"
                                    width="600"
                                    style="display:block;border:0;width:100%;max-width:600px;height:auto;-ms-interpolation-mode:bicubic;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;color:#1C1C1A;"
                                />
                            </a>
                        </td>
                    </tr>

                    <!-- HTML 2: Closing CTA -->
                    <tr>
                        <td align="center" class="text-cell" style="padding:0 56px 48px 56px;background-color:#F0EFEA;">
                            <p class="cta-heading" style="margin:0;padding:0;font-family:'DM Serif Display',Georgia,'Times New Roman',Times,serif;font-size:32px;font-weight:400;color:#1C1C1A;letter-spacing:-0.4px;line-height:1.2;">
                                {{closing_heading}}
                            </p>
                            <p style="margin:10px 0 0 0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#66655C;line-height:1.6;">
                                {{closing_line}}
                            </p>

                            <!-- CTA Buttons (stack on mobile). Store pages show Open / Update / Get as needed. -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate !important;margin-top:24px;">
                                <tr>
                                    <td class="cta-btn-cell" align="center" style="padding:0 6px 0 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate !important;">
                                            <tr>
                                                <td align="center" bgcolor="#4A6C48" style="border-radius:12px;background-color:#4A6C48;">
                                                    <a href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992" target="_blank" class="cta-btn" style="display:inline-block;padding:15px 30px;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;border-radius:12px;line-height:1.2;">
                                                        <span style="color:#ffffff;">Open on iPhone &rarr;</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="cta-btn-cell" align="center" style="padding:0 0 0 6px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate !important;">
                                            <tr>
                                                <td align="center" bgcolor="#4A6C48" style="border-radius:12px;background-color:#4A6C48;">
                                                    <a href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN" target="_blank" class="cta-btn" style="display:inline-block;padding:15px 30px;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;border-radius:12px;line-height:1.2;">
                                                        <span style="color:#ffffff;">Open on Android &rarr;</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:16px 0 0 0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#66655C;line-height:1.5;">
                                {{small_print}}
                            </p>
                        </td>
                    </tr>

                    <!-- Footer (identical to the other campaigns) -->
                    <tr>
                        <td align="left" bgcolor="#1c2b14" class="footer-cell" style="padding:40px 40px 40px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">

                                <!-- App Badges -->
                                <tr>
                                    <td align="left" style="padding-bottom:20px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            DOWNLOAD THE APP
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td class="store-badge-cell" align="left" style="padding-right:6px;">
                                                    <a href="https://apps.apple.com/in/app/gud-for-us-clean-food-ai/id6755870992" target="_blank" class="store-badge" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                                                        <img src="https://gudforus.com/email/appstore.svg" alt="Download on the App Store" width="120" height="40" style="display:block;border:0;width:120px;height:40px;-ms-interpolation-mode:bicubic;" />
                                                    </a>
                                                </td>
                                                <td class="store-badge-cell" align="left">
                                                    <a href="https://play.google.com/store/apps/details?id=com.app.gudforus&hl=en_IN" target="_blank" class="store-badge" style="display:inline-block;text-decoration:none;line-height:0;font-size:0;">
                                                        <img src="https://gudforus.com/email/playstore.svg" alt="Get it on Google Play" width="120" height="40" style="display:block;border:0;width:120px;height:40px;-ms-interpolation-mode:bicubic;" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td style="border-top:1px solid #2e4421;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Blog Links -->
                                <tr>
                                    <td align="left" style="padding-bottom:14px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#6b8f52;text-transform:uppercase;letter-spacing:2px;line-height:1.2;">
                                            FROM OUR BLOG
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-bottom:8px;">
                                        <a href="https://gudforus.com/blog/why-ingredient-lists-are-hard-to-understand" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">Why Ingredient Lists Are Hard to Understand &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-bottom:8px;">
                                        <a href="https://gudforus.com/blog/allergy-ingredient-checker" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">How to Check if a Product Is Safe for Your Allergy &rarr;</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="https://gudforus.com/blog/blueberries-superfood" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:3px;line-height:1.5;">
                                            <span style="color:#f5f0e8;">Blueberries: The Superfood You Don't Have to Try Hard to Eat &rarr;</span>
                                        </a>
                                    </td>
                                </tr>

                                <!-- Divider -->
                                <tr>
                                    <td style="padding:28px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse !important;">
                                            <tr>
                                                <td style="border-top:1px solid #2e4421;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Wordmark, Tagline, Unsubscribe -->
                                <tr>
                                    <td align="left">
                                        <a href="https://gudforus.com" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#f5f0e8;text-decoration:none;letter-spacing:-0.3px;line-height:1.2;">
                                            gudforus.com
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-top:12px;padding-bottom:24px;">
                                        <p style="margin:0;padding:0;font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#4a6e35;line-height:1.5;">
                                            Shop smarter. Eat better. Feel good.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="{{unsubscribe_url}}" target="_blank" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;font-weight:400;color:#f5f0e8;text-decoration:underline;text-underline-offset:2px;letter-spacing:0.3px;">
                                            <span style="color:#f5f0e8;">Unsubscribe from these emails</span>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
                <!-- End Inner Container -->

            </td>
        </tr>
    </table>
    <!-- End Outer Wrapper -->

</body>
</html>`;

// The two versions differ only in these slots; the layout lives once in NEW_LOOK_TEMPLATE.
//   lapsed: hasn't opened the app in 7+ days ("it's been a while", "missed you")
//   active: opened the app in the last 7 days
// send-pending-emails picks the variant at send time from profiles.last_seen_at.
export type NewLookVariant = "lapsed" | "active";

const NEW_LOOK_COPY: Record<NewLookVariant, Record<string, string>> = {
  lapsed: {
    intro: "Hi {{name}}, it&rsquo;s been a while. While you were away, Gud got a glow-up: cleaner screens, clearer scores, and a blueberry that reacts to how you&rsquo;re doing. You can also share your scans with friends now.",
    closing_image: "https://gudforus.com/email/new_look/new_look_6.jpg",
    closing_image_alt: "Your blueberry missed you. It's waving hello.",
    closing_heading: "Come say hi.",
    closing_line: "Open Gud and see which mood your blueberry&rsquo;s in.",
    small_print: "Still have Gud? Tap Open or Update. Deleted it? Tap Get. No hard feelings.",
  },
  active: {
    intro: "Hi {{name}}, thanks for scanning with Gud lately. The app just got a glow-up: cleaner screens, clearer scores, and a blueberry that reacts to how you&rsquo;re doing. You can also share your scans with friends now.",
    closing_image: "https://gudforus.com/email/new_look/new_look_v2_6.jpg",
    closing_image_alt: "Say hi to your blueberry. It's waving hello.",
    closing_heading: "See it for yourself.",
    closing_line: "Open Gud and see which mood your blueberry&rsquo;s in today.",
    small_print: "Not seeing the new look yet? Tap Update, or close Gud fully and open it again.",
  },
};

export function renderNewLookEmail(
  firstName: string,
  unsubscribeUrl: string,
  variant: NewLookVariant,
): { subject: string; html: string } {
  const copy = NEW_LOOK_COPY[variant];
  let html = NEW_LOOK_TEMPLATE;
  for (const [slot, value] of Object.entries(copy)) {
    html = html.replaceAll(`{{${slot}}}`, value);
  }
  return {
    // No {{name}} in the subject: without a display name it falls back to the
    // email's local part (e.g. "john.smith87"), which reads badly in an inbox.
    subject: "Gud has a new look (and a blueberry with feelings)",
    html: html
      .replace(/\{\{name\}\}/g, firstName)
      .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl),
  };
}

import { Resend } from 'resend'
import { render } from '@react-email/components'
import { createElement } from 'react'

// Inline minimal versions of both templates to test without TS compilation
const resend = new Resend('re_UczifQ3D_64ZYiWXe57YwhWntDrRAZyEj')

const APP_URL   = 'https://www.bolbbbol.com'
const FROM      = 'noreply@bolbbbol.com'
const ADMIN     = 'dynamicentertainment.tech@gmail.com'
const TEST_USER = 'dynamicentertainment.tech@gmail.com' // send test confirmation here too

// We'll use the compiled Next.js — just call the API endpoint via fetch
// Instead, let's call Resend directly with pre-built HTML

const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#050505;margin:0;padding:40px 0;font-family:Georgia,serif">
  <div style="height:3px;background:linear-gradient(to right,transparent,#C8960C 20%,#E8B84B 50%,#C8960C 80%,transparent)"></div>
  <div style="background:#0A0A0A;max-width:600px;margin:0 auto;border:1px solid rgba(200,150,12,0.2)">

    <div style="padding:44px 40px 28px;text-align:center">
      <img src="${APP_URL}/logos/anchors-army-logo.png" alt="69 Anchors Army" width="160" style="display:block;margin:0 auto">
    </div>

    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(200,150,12,0.6) 30%,rgba(200,150,12,0.6) 70%,transparent);margin:0 40px"></div>

    <div style="text-align:center;padding:24px 40px 0">
      <span style="display:inline-block;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.22em;color:#C8960C;border:1px solid rgba(200,150,12,0.4);padding:6px 16px;background:rgba(200,150,12,0.06)">✦ REGISTRATION CONFIRMED ✦</span>
    </div>

    <div style="padding:16px 40px 0;text-align:center">
      <p style="font-family:Georgia,serif;font-size:32px;font-weight:600;color:#F0E8D8;margin:0 0 10px;line-height:1.2">Your Slot is Locked In</p>
      <p style="font-family:Arial,sans-serif;font-size:15px;color:#888;margin:0 0 4px;line-height:1.6">Welcome, Test User. You've secured your place in the 69 Anchors Army.</p>
    </div>

    <div style="padding:24px 40px">
      <div style="border:1px solid rgba(200,150,12,0.35);background:rgba(200,150,12,0.04);padding:24px 28px;text-align:center">
        <p style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;color:#C8960C;margin:0 0 8px;text-transform:uppercase">Squad 1</p>
        <p style="font-family:Georgia,serif;font-size:26px;font-weight:600;color:#F0E8D8;margin:0 0 10px;line-height:1.2">Aug 8th &amp; 9th</p>
        <div style="display:inline-block;border-top:1px solid rgba(200,150,12,0.2);padding-top:10px;margin-top:4px">
          <p style="font-family:Arial,sans-serif;font-size:12px;color:#888;margin:0;letter-spacing:0.08em">Checkout &nbsp;·&nbsp; Aug 10th</p>
        </div>
      </div>
    </div>

    <div style="padding:0 40px"><hr style="border-top:1px solid rgba(255,255,255,0.06);margin:4px 0"></div>

    <div style="padding:8px 40px 24px">
      <p style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#C8960C;text-transform:uppercase;margin:20px 0 14px">What happens next</p>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#AAA;line-height:1.7;margin:0 0 8px"><span style="color:#C8960C">→</span> &nbsp;Our team will reach out on your registered mobile number with venue details and logistics.</p>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#AAA;line-height:1.7;margin:0 0 8px"><span style="color:#C8960C">→</span> &nbsp;You'll be added to the exclusive 69 Anchors Army WhatsApp community.</p>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#AAA;line-height:1.7;margin:0"><span style="color:#C8960C">→</span> &nbsp;Keep this email. It is your confirmation record.</p>
    </div>

    <div style="text-align:center;padding:8px 40px 32px">
      <a href="${APP_URL}" style="display:inline-block;background:#C8960C;color:#000;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;padding:14px 36px">Visit bolbbbol.com</a>
    </div>

    <div style="padding:0 40px"><hr style="border-top:1px solid rgba(255,255,255,0.06);margin:4px 0"></div>

    <div style="padding:28px 40px;text-align:center">
      <p style="font-family:Georgia,serif;font-size:20px;font-style:italic;color:#888;margin:0 0 8px;line-height:1.5">"baat karne se baat banti hai"</p>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin:0;letter-spacing:0.1em">— Anchor BB</p>
    </div>

    <div style="padding:16px 40px 36px;text-align:center;background:rgba(200,150,12,0.03);border-top:1px solid rgba(200,150,12,0.1)">
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin:0 0 6px;line-height:1.6">This is an automated confirmation from the 69 Anchors Army registration system.<br>Powered by <a href="${APP_URL}" style="color:#C8960C;text-decoration:none">Anchor Bol BB Bol</a></p>
      <p style="font-family:Arial,sans-serif;font-size:11px;color:#333;margin:0">© 2025 Anchor Bol BB Bol · ${APP_URL}</p>
    </div>

  </div>
  <div style="height:3px;background:linear-gradient(to right,transparent,#C8960C 20%,#E8B84B 50%,#C8960C 80%,transparent)"></div>
</body>
</html>`

const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#050505;margin:0;padding:40px 0;font-family:Arial,sans-serif">
  <div style="height:3px;background:linear-gradient(to right,transparent,#C8960C 20%,#E8B84B 50%,#C8960C 80%,transparent)"></div>
  <div style="background:#0A0A0A;max-width:520px;margin:0 auto;border:1px solid rgba(200,150,12,0.2)">

    <div style="padding:36px 36px 24px;text-align:center">
      <img src="${APP_URL}/logos/anchors-army-logo.png" alt="69 Anchors Army" width="120" style="display:block;margin:0 auto 16px">
      <span style="display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.22em;color:#000;background:#C8960C;padding:6px 18px">NEW REGISTRATION</span>
    </div>

    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(200,150,12,0.5) 30%,rgba(200,150,12,0.5) 70%,transparent);margin:0 36px"></div>

    <div style="padding:28px 36px">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.2em;color:#C8960C;text-transform:uppercase;margin:0 0 16px">Registration Details</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.08em;text-transform:uppercase;width:100px;padding:8px 0">Name</td><td style="font-size:14px;color:#D0C8B8;padding:8px 0">Test User</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.05)"><td style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.08em;text-transform:uppercase;padding:8px 0">Email</td><td style="font-size:14px;color:#D0C8B8;padding:8px 0">test@example.com</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.05)"><td style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.08em;text-transform:uppercase;padding:8px 0">Mobile</td><td style="font-size:14px;color:#D0C8B8;padding:8px 0">+91 98765 43210</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.05)"><td style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.08em;text-transform:uppercase;padding:8px 0">Squad</td><td style="font-size:14px;color:#D0C8B8;padding:8px 0">Squad 1</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.05)"><td style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.08em;text-transform:uppercase;padding:8px 0">Dates</td><td style="font-size:14px;color:#D0C8B8;padding:8px 0">Aug 8th &amp; 9th</td></tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.05)"><td style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.08em;text-transform:uppercase;padding:8px 0">Checkout</td><td style="font-size:14px;color:#D0C8B8;padding:8px 0">Aug 10th</td></tr>
      </table>
    </div>

    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(200,150,12,0.5) 30%,rgba(200,150,12,0.5) 70%,transparent);margin:0 36px"></div>

    <div style="padding:16px 36px 28px;text-align:center">
      <p style="font-size:11px;color:#444;margin:0;letter-spacing:0.06em">Registered at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST</p>
    </div>

  </div>
  <div style="height:3px;background:linear-gradient(to right,transparent,#C8960C 20%,#E8B84B 50%,#C8960C 80%,transparent)"></div>
</body>
</html>`

console.log('Sending test emails...')

const [conf, admin] = await Promise.all([
  resend.emails.send({
    from:    `69 Anchors Army <${FROM}>`,
    to:      TEST_USER,
    subject: `[TEST] Your Squad 1 slot is confirmed — Aug 8th & 9th`,
    html:    confirmHtml,
  }),
  resend.emails.send({
    from:    `69 Anchors Army <${FROM}>`,
    to:      ADMIN,
    subject: `[TEST] New Registration — Test User · Squad 1`,
    html:    adminHtml,
  }),
])

console.log('Confirmation email:', conf.data?.id ?? conf.error)
console.log('Admin notification:', admin.data?.id ?? admin.error)

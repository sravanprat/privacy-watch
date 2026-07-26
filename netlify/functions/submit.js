exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  const { name, email, role, rating, useful_features, comments } = body;

  if (!process.env.RESEND_API_KEY) {
    return { statusCode: 500, body: 'Email service not configured' };
  }

  const replyTo = email && email.includes('@') ? email : undefined;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:Inter,system-ui,sans-serif;background:#F8F6F1;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(26,39,68,0.10)">
    <div style="background:#1A2744;padding:20px 28px">
      <div style="font-size:11px;font-weight:800;letter-spacing:.3em;color:#C4973B;text-transform:uppercase">PrivacyWatch</div>
      <div style="font-size:18px;font-weight:700;color:#E8ECF4;margin-top:4px">Beta Feedback</div>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr style="border-bottom:1px solid #EDE9DF">
          <td style="padding:10px 0;color:#8B9BB4;font-weight:600;width:36%">Name</td>
          <td style="padding:10px 0;color:#1A2744">${name || '<em style="color:#8B9BB4">Not provided</em>'}</td>
        </tr>
        <tr style="border-bottom:1px solid #EDE9DF">
          <td style="padding:10px 0;color:#8B9BB4;font-weight:600">Role</td>
          <td style="padding:10px 0;color:#1A2744">${role || '<em style="color:#8B9BB4">Not provided</em>'}</td>
        </tr>
        <tr style="border-bottom:1px solid #EDE9DF">
          <td style="padding:10px 0;color:#8B9BB4;font-weight:600">Rating</td>
          <td style="padding:10px 0;color:#1A2744">${rating || '<em style="color:#8B9BB4">Not rated</em>'}</td>
        </tr>
        <tr style="border-bottom:1px solid #EDE9DF">
          <td style="padding:10px 0;color:#8B9BB4;font-weight:600">Useful features</td>
          <td style="padding:10px 0;color:#1A2744">${useful_features || '<em style="color:#8B9BB4">None selected</em>'}</td>
        </tr>
        <tr style="border-bottom:1px solid #EDE9DF">
          <td style="padding:10px 0;color:#8B9BB4;font-weight:600;vertical-align:top">Comments</td>
          <td style="padding:10px 0;color:#1A2744">${comments || '<em style="color:#8B9BB4">None</em>'}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#8B9BB4;font-weight:600">Reply to</td>
          <td style="padding:10px 0;color:#1A2744">${email || '<em style="color:#8B9BB4">Not provided</em>'}</td>
        </tr>
      </table>
    </div>
    <div style="background:#F4F1EA;padding:14px 28px;font-size:11px;color:#8B9BB4">
      Sent via PrivacyWatch Beta · <a href="https://privacywatch.io" style="color:#C4973B">privacywatch.io</a>
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PrivacyWatch Feedback <feedback@privacywatch.io>',
        to: ['sravan.prathy@gmail.com'],
        ...(replyTo && { reply_to: replyTo }),
        subject: `PrivacyWatch Feedback${role ? ' — ' + role : ''}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Send failed' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};

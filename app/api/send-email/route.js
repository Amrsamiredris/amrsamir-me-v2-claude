import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Only initialize Resend if the API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    const { type, email, message, name } = await request.json();
    
    if (!resend) {
      console.warn("Resend API Key is missing. Email would have been sent:", { type, email, message });
      return NextResponse.json({ success: true, simulated: true, message: "Simulated email send (missing API key)" }, { status: 200 });
    }

    let subject = '';
    let htmlContent = '';

    if (type === 'access_request') {
      subject = `Admin Dashboard Access Request from ${name || email}`;
      htmlContent = `
        <h2>New Access Request</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message/Reason:</strong> ${message || 'No reason provided.'}</p>
        <br/>
        <p>Please log in to the Supabase dashboard to create an account for this user if approved.</p>
      `;
    } else if (type === 'password_reset_alert') {
      subject = `Security Alert: Password Reset Requested`;
      htmlContent = `
        <h2>Password Reset Alert</h2>
        <p>A password reset was just requested for the following admin email:</p>
        <p><strong>${email}</strong></p>
        <br/>
        <p>If this was not you or an authorized team member, please check your Supabase Auth logs immediately.</p>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Admin System <onboarding@resend.dev>', // Use a verified domain in production, but onboarding@resend.dev works for testing
      to: 'dev@amrasmir.me', // The target email requested by the user
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

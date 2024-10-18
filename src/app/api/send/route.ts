import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize the Resend instance
const resend = new Resend(process.env.RESEND_API_KEY ?? '');

// Define the types for the request body
interface ContactRequestBody {
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  // Check if the API key or fromEmail is missing
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
    console.warn('Missing RESEND_API_KEY or FROM_EMAIL in environment variables.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // Parse the request body
    const { email, subject, message }: ContactRequestBody = await req.json();

    console.log('Email data received:', { email, subject, message });

    // Define the HTML content for the email
    const htmlContent = `
      <h1>${subject}</h1>
      <p>Thank you for contacting us!</p>
      <p>New message submitted:</p>
      <p>${message}</p>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.FROM_EMAIL, email],
      subject,
      html: htmlContent,
    });

    // Return the response data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }
}

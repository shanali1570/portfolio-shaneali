import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure to provide default values if environment variables are not set
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail: string = process.env.FROM_EMAIL ?? ''; // Default to empty string if not defined

// Define the types for the request body
interface ContactRequestBody {
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {

  

  try {
    // Parse the request body
    const { email, subject, message }: ContactRequestBody = await req.json();

    console.log(email, subject, message);

    // Define the HTML content
    const htmlContent = `
      <h1>${subject}</h1>
      <p>Thank you for contacting us!</p>
      <p>New message submitted:</p>
      <p>${message}</p>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      html: htmlContent, // Use the 'html' field instead of 'react'
    });

    // Return the response data
    return NextResponse.json(data);
  } catch (error) {
    // Return an error response
    return NextResponse.json({ error: (error as Error).message });
  }
}

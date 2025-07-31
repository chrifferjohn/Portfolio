import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'langomezchriff795@gmail.com', // your Gmail address
        pass: 'vwui zuxt ctic vvdn', // your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: 'langomezchriff795@gmail.com',
      to: 'langomezchriff795@gmail.com', // send to your Gmail
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
} 
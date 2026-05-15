import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "shubhamrathour07062000@gmail.com",
      subject: `Portfolio Contact From ${name}`,
      html: `
        <h2>New Portfolio Message</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong> ${message}
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
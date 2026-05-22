import { NextResponse } from "next/server";
import { Resend } from "resend";
import { defaultPortfolioContent } from "@/lib/data";
import { getMongoClient } from "@/lib/mongodb";

const DATABASE_NAME = process.env.MONGODB_DB ?? "shubham_portfolio";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = escapeHtml(String(body.name ?? ""));
    const email = escapeHtml(String(body.email ?? ""));
    const message = escapeHtml(String(body.message ?? ""));

    const client = await getMongoClient();
    let stored = false;

    if (client) {
      await client.db(DATABASE_NAME).collection("contact_messages").insertOne({
        name,
        email,
        message,
        createdAt: new Date(),
        read: false,
      });
      stored = true;
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: defaultPortfolioContent.contactEmail,
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
    } else if (!stored) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and database services are not configured.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      stored,
    });

  } catch {

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

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

const SESSION_VALUE = process.env.ADMIN_SESSION_SECRET ?? "portfolio-admin";
const DATABASE_NAME = process.env.MONGODB_DB ?? "shubham_portfolio";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== SESSION_VALUE) {
    return NextResponse.json(
      {
        messages: [],
      },
      {
        status: 401,
      }
    );
  }

  const client = await getMongoClient();

  if (!client) {
    return NextResponse.json({
      messages: [],
      source: "default",
    });
  }

  const messages = await client
    .db(DATABASE_NAME)
    .collection("contact_messages")
    .find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();

  return NextResponse.json({
    messages,
    source: "database",
  });
}

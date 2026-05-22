import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/data";
import { getMongoClient } from "@/lib/mongodb";

const SESSION_VALUE = process.env.ADMIN_SESSION_SECRET ?? "portfolio-admin";
const DATABASE_NAME = process.env.MONGODB_DB ?? "shubham_portfolio";
const DOCUMENT_ID = "main";

function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const content = value as Partial<PortfolioContent>;

  return Boolean(
    content.hero &&
      Array.isArray(content.about) &&
      Array.isArray(content.projects) &&
      Array.isArray(content.skills) &&
      typeof content.contactEmail === "string"
  );
}

export async function GET() {
  const client = await getMongoClient();

  if (!client) {
    return NextResponse.json({
      content: defaultPortfolioContent,
      source: "default",
    });
  }

  const content = await client
    .db(DATABASE_NAME)
    .collection<{ _id: string; content: PortfolioContent }>(
      "portfolio_content"
    )
    .findOne({ _id: DOCUMENT_ID });

  return NextResponse.json({
    content: content?.content ?? defaultPortfolioContent,
    source: content ? "database" : "default",
  });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== SESSION_VALUE) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const body = await req.json();

  if (!isPortfolioContent(body.content)) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  const client = await getMongoClient();

  if (!client) {
    return NextResponse.json({
      success: true,
      persisted: false,
    });
  }

  await client
    .db(DATABASE_NAME)
    .collection<{ _id: string; content: PortfolioContent }>(
      "portfolio_content"
    )
    .updateOne(
      { _id: DOCUMENT_ID },
      {
        $set: {
          content: body.content,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      }
    );

  return NextResponse.json({
    success: true,
    persisted: true,
  });
}

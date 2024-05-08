import { collections } from "@/lib/dummy";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO: replace with real data
  return new NextResponse(JSON.stringify(collections), {
    status: 200,
  });
}

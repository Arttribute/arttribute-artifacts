import { artifacts } from "@/lib/dummy";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO: replace with real data
  return new NextResponse(JSON.stringify(artifacts), {
    status: 200,
  });
}

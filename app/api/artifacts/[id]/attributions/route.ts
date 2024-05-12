import { NextResponse } from "next/server";

// To attribute an artifact
export async function POST(request: Request) {
  const body = await request.json();

  return new NextResponse(JSON.stringify(body), {
    status: 200,
  });
}

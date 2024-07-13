import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.API_URL}/artifacts`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return new NextResponse("Failed to fetch", {
      status: res.status,
    });
  }

  const { data: artifacts } = await res.json();

  if (!artifacts) {
    return new NextResponse("No artifacts found", {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(artifacts), {
    status: 200,
  });
}

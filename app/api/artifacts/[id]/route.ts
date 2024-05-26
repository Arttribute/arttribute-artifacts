import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const res = await fetch(`${process.env.API_URL}/artifacts/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      return new NextResponse("Artifact Not Found", {
        status: 404,
      }); // TODO: create a 404 route on API
    }
    return new NextResponse("Failed to fetch", {
      status: res.status,
    });
  }

  const artifact = await res.json();

  return new NextResponse(JSON.stringify(artifact), {
    status: 200,
  });
}

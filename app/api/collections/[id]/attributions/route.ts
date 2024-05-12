import { NextResponse } from "next/server";

type Params = {
  id: string;
};

// To attribute a collection
export async function POST(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const body = await request.json();

  return new NextResponse(JSON.stringify({ id, ...body }), {
    status: 200,
  });
}

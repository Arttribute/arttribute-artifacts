import { collections } from "@/lib/dummy";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  // TODO: replace with real data
  const collection = collections.find((collection) => collection.id === id);

  if (!collection) {
    return new NextResponse("Collection Not Found", {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(collection), {
    status: 200,
  });
}

export async function POST(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const body = await request.json();

  // TODO: for each artifact, create collection artifact
  return new NextResponse(JSON.stringify({ id, ...body }), {
    status: 200,
  });
}

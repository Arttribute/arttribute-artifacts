import { artifacts } from "@/lib/dummy";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  // TODO: replace with real data
  return new NextResponse(JSON.stringify(artifacts), {
    status: 200,
  });
}

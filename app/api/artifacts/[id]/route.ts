import { artifacts } from "@/lib/dummy";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  // TODO: replace with real data
  const artifact = artifacts.find((artifact) => artifact.id === id);

  if (!artifact) {
    return new NextResponse("Artifact Not Found", {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(artifact), {
    status: 200,
  });
}

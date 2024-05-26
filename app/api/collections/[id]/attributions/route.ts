import { NextResponse } from "next/server";

type Params = {
  id: string;
};

type ArtifactInput = {
  web3Address: string;
};

// To attribute an artifact
export async function POST(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const { web3Address }: ArtifactInput = await request.json();

  try {
    const res = await fetch(`${process.env.API_URL}/attributions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-authentication-address": "", // this dictates the attributorId
        "x-authentication-message": "",
        "x-authentication-signature": "", // TODO: fetch these somehow
      },
      body: JSON.stringify({
        attributorId: web3Address,
        collectionId: id,
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      console.error(message);
      return new NextResponse(JSON.stringify({ message }), {
        status: 400,
      });
    }

    const { data } = await res.json();

    return new NextResponse(JSON.stringify(data), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

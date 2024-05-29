import { NextResponse } from "next/server";

type Params = {
  id: string;
};

type CollectionInput = {
  authHeaders: AuthHeaders;
};

// To attribute a collection
export async function POST(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const { authHeaders }: CollectionInput = await request.json();

  const { address, message, signature } = authHeaders;

  if (!address || !message || !signature) {
    return new NextResponse("Please provide authentication headers.", {
      status: 400,
    });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/attributions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-authentication-address": address,
        "x-authentication-message": message,
        "x-authentication-signature": signature,
      },
      body: JSON.stringify({
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

import { NextResponse } from "next/server";

type Params = {
  id: string;
};

interface CollectionItem {
  itemId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const res = await fetch(`${process.env.API_URL}/collections/${id}/items`);

  if (!res.ok) {
    if (res.status === 404) {
      return new NextResponse("Collection Not Found", {
        status: 404,
      }); // TODO: create a 404 route on API
    }
    return new NextResponse("Failed to fetch", {
      status: res.status,
    });
  }

  const collectionItems = await res.json();

  return new NextResponse(JSON.stringify(collectionItems), {
    status: 200,
  });
}

export async function POST(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const body = await request.json();

  const { address, message, signature } = body.authHeaders;

  if (!address || !message || !signature) {
    return new NextResponse("Please provide authentication headers.", {
      status: 400,
    });
  }

  const collectionItems: CollectionItem[] = body.items.map(
    (artifactId: string) => ({
      itemId: artifactId,
    })
  );

  const res = await fetch(`${process.env.API_URL}/collections/${id}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authentication-address": address,
      "x-authentication-message": message,
      "x-authentication-signature": signature,
    },
    body: JSON.stringify(collectionItems),
  });

  if (!res.ok) {
    const { message } = await res.json();
    console.error(message);
    return new NextResponse(JSON.stringify({ message }), {
      status: 400,
    });
  }

  const data = await res.json();

  return new NextResponse(JSON.stringify(data), {
    status: 201,
  });
}

import { collections } from "@/lib/dummy";
import { mapLicense } from "@/lib/utils";
import { NextResponse } from "next/server";

type CollectionInput = {
  collectionName: string;
  license: LicenseType;
};

export async function GET() {
  // TODO: replace with real data
  return new NextResponse(JSON.stringify(collections), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const { collectionName, license }: CollectionInput = await request.json();

  if (!collectionName || !license) {
    return new NextResponse("Please provide a collection name and a license.", {
      status: 400,
    });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-authentication-address": "",
        "x-authentication-message": "",
        "x-authentication-signature": "", // TODO: add real auth headers
      },
      body: JSON.stringify({
        name: collectionName,
        license: mapLicense(license as LicenseType),
      }),
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
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

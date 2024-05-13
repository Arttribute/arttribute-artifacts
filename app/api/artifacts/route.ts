import { artifacts } from "@/lib/dummy";
import { mapLicense } from "@/lib/utils";
import { NextResponse } from "next/server";

type ArtifactInput = {
  fileAsBase64: string;
  license: string;
};

export async function GET() {
  // TODO: replace with real data
  return new NextResponse(JSON.stringify(artifacts), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const { fileAsBase64, license }: ArtifactInput = await request.json();

  try {
    const res = await fetch(`${process.env.API_URL}/artifacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        asset: {
          data: fileAsBase64,
        },
        license: mapLicense(license as LicenseType),
        imageUrl: null,
        whitelist: [],
        blacklist: [],
        name: "Random Name", // TODO: confirm this isn't necessary
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

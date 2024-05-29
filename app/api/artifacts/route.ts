import { mapLicense } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

type ArtifactInput = {
  fileAsBase64: string;
  license: string;
  authHeaders: AuthHeaders;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("uid");

  if (!address) {
    return new NextResponse("Please provide a valid address", {
      status: 400,
    });
  }

  const res = await fetch(`${process.env.API_URL}/users/${address}/artifacts`);

  if (!res.ok) {
    if (res.status === 404) {
      return new NextResponse("No artifacts found for this user", {
        status: 404,
      });
    }
    if (res.status === 401) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    return new NextResponse("Failed to fetch", {
      status: res.status,
    });
  }

  const { data: artifacts } = await res.json();

  if (!artifacts) {
    return new NextResponse("No artifacts found for this user", {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(artifacts), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const { fileAsBase64, license, authHeaders }: ArtifactInput =
    await request.json();

  const { address, message, signature } = authHeaders;

  if (!address || !message || !signature) {
    return new NextResponse("Please provide authentication headers.", {
      status: 400,
    });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/artifacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-authentication-address": address,
        "x-authentication-message": message,
        "x-authentication-signature": signature,
      },
      body: JSON.stringify({
        asset: {
          data: fileAsBase64,
        },
        license: mapLicense(license as LicenseType),
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

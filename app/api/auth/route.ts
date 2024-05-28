import { NextResponse } from "next/server";

type AuthInput = {
  address: string;
};

export async function POST(request: Request) {
  const { address }: AuthInput = await request.json();

  if (!address) {
    return new NextResponse("Please provide an address.", {
      status: 400,
    });
  }

  const res = await fetch(`${process.env.API_URL}/authentication/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
    }),
  });

  if (!res.ok) {
    return new NextResponse("Failed to fetch", {
      status: res.status,
    });
  }

  const { data } = await res.json();

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}

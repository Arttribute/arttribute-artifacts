type Params = {
  id: string;
};

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = params;

  const body = await request.json();

  return new Response(JSON.stringify(body), {
    status: 200,
  });
}

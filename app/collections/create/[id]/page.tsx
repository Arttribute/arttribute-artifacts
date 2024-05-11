import AddArtifactsToCollection from "@/components/forms/AddArtifactsToCollection";

type Params = {
  id: string;
};

const getArtifactsByUser = async (web3Address: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/users/${web3Address}/artifacts`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function AddArtifactToCollection({
  params,
}: {
  params: Params;
}) {
  const { id } = params;

  const artifactsByUser: Artifact[] = await getArtifactsByUser("0x1234");

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      <AddArtifactsToCollection collectionId={id} artifacts={artifactsByUser} />
    </div>
  );
}

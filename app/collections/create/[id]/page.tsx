import { getArtifacts } from "@/app/artifacts/page";
import AddArtifactsToCollection from "@/components/forms/AddArtifactsToCollection";

type Params = {
  id: string;
};

export default async function AddArtifactToCollection({
  params,
}: {
  params: Params;
}) {
  const { id } = params;

  const artifactsByUser: Artifact[] = await getArtifacts();

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      <AddArtifactsToCollection collectionId={id} artifacts={artifactsByUser} />
    </div>
  );
}

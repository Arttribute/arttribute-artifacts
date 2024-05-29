"use client";
import AddArtifactsToCollection from "@/components/forms/AddArtifactsToCollection";
import { useAuth } from "@/components/providers/AuthProvider";
import { useArtifacts } from "@/lib/fetchers";

type Params = {
  id: string;
};

export default function AddArtifactToCollection({
  params,
}: {
  params: Params;
}) {
  const { id } = params;
  const { account } = useAuth();

  const { artifacts, isLoading, error } = useArtifacts(account);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      <AddArtifactsToCollection collectionId={id} artifacts={artifacts} />
    </div>
  );
}

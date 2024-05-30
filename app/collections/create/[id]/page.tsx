"use client";
import AddArtifactsToCollection from "@/components/forms/AddArtifactsToCollection";
import NotFound from "@/components/NotFound";
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
  if (error) {
    let message = error.message;
    if (!account) message += ". Possible fix: Please login to view this page";
    throw new Error(message);
  }

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      {artifacts ? (
        <AddArtifactsToCollection collectionId={id} artifacts={artifacts} />
      ) : (
        <NotFound resource="artifact" />
      )}
    </div>
  );
}

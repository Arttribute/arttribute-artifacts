import { mapLicense } from "@/lib/utils";
import AttributeButton from "@/components/AttributeButton";
import { getCollectionById, getCollectionItems } from "../page";
import ImageGrid from "@/components/ImageGrid";

type Params = {
  id: string;
};

export default async function AttributeArtifact({
  params,
}: {
  params: Params;
}) {
  const { id } = params;

  const collectionPromise: Promise<Collection> = getCollectionById(id);
  const collectionItemsPromise: Promise<string[]> = getCollectionItems(id);

  const [collection, artifactImages] = await Promise.all([
    collectionPromise,
    collectionItemsPromise,
  ]);

  const { creatorId, license }: Collection = collection;

  return (
    <div className="container p-6 space-y-4 w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">Make Attribution</h1>
      <ImageGrid images={artifactImages} />
      <div className="space-y-3">
        <div className="">
          <h4 className="text-sm">By {creatorId ?? "Anonymous"}</h4>
          <h4 className="text-sm font-bold">
            Arttribute {mapLicense(license)} License
          </h4>
        </div>
        <p className="font-extralight text-sm">
          Use art responsibly and support its creators
        </p>
        <AttributeButton purpose="collections" id={id} />
      </div>
    </div>
  );
}

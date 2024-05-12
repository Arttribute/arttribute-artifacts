import { mapLicense } from "@/lib/utils";
import AttributeButton from "@/components/AttributeButton";
import { getCollectionById } from "../page";
import { artifacts } from "@/lib/dummy";
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

  const { creator, license }: Collection = await getCollectionById(id);

  return (
    <div className="container p-6 space-y-4 w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">Make Attribution</h1>
      <ImageGrid images={Array(5).fill(artifacts[0].image_url)} />
      <div className="space-y-3">
        <div className="">
          <h4 className="text-sm">By {creator}</h4>
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

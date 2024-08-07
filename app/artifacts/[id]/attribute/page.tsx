import { mapLicense } from "@/lib/utils";
import Image from "next/image";
import AttributeButton from "@/components/AttributeButton";
import { getArtifactById } from "@/lib/fetchers-server";

type Params = {
  id: string;
};

export default async function AttributeArtifact({
  params,
}: {
  params: Params;
}) {
  const { id } = params;

  const artifact = await getArtifactById(id);

  const { creatorId, imageUrl, license }: Artifact = artifact.data;

  return (
    <div className="container p-6 space-y-4 w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">Make Attribution</h1>
      <Image
        src={imageUrl}
        alt="artifact"
        width={400}
        height={400}
        className="object-cover rounded-lg aspect-square"
      />
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
        <AttributeButton
          purpose="artifacts"
          id={id}
          creatorAddress={creatorId}
        />
      </div>
    </div>
  );
}

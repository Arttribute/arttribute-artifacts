import { mapLicense } from "@/lib/utils";
import Image from "next/image";
import { getArtifactById } from "../page";
import AttributeButton from "@/components/AttributeButton";

type Params = {
  id: string;
};

export default async function AttributeArtifact({
  params,
}: {
  params: Params;
}) {
  const { id } = params;

  const { creator, image_url, license }: Artifact = await getArtifactById(id);

  return (
    <div className="container p-6 space-y-4 w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">Make Attribution</h1>
      <Image
        src={image_url}
        alt="artifact"
        width={400}
        height={400}
        className="object-cover rounded-lg aspect-square"
      />
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
        <AttributeButton purpose="artifacts" id={id} />
      </div>
    </div>
  );
}

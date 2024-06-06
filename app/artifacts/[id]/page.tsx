import { handleChangeBlackWhiteList } from "@/app/actions/actions";
import ArtifactDisplayOption from "@/components/artifacts/ArtifactDisplayOption";
import { Separator } from "@/components/ui/separator";
import { getArtifactById } from "@/lib/fetchers-server";
import Image from "next/image";

type Params = {
  id: string;
};

export default async function Artifact({ params }: { params: Params }) {
  const { id } = params;

  const artifact = await getArtifactById(id);

  const { imageUrl, license }: Artifact = artifact.data;

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="mx-auto md:m-0 flex justify-center items-center gap-2">
          {/* p-0.5 border-2 rounded-lg */}
          <Separator orientation="vertical" className="h-full w-[1px]" />
          <Image
            src={imageUrl}
            alt="artifact"
            width={400}
            height={400}
            className="object-cover rounded-lg aspect-square"
          />
          <Separator orientation="vertical" className="h-full w-[1px]" />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold">Arttribute {license} License</h4>
          <p className="font-extralight text-sm">X Attributions</p>{" "}
          {/* TODO: maybe got by join? */}
          <ArtifactDisplayOption artifact={artifact.data as Artifact} />
        </div>
      </div>
    </div>
  );
}

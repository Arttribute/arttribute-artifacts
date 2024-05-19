import BlackWhiteList from "@/components/artifacts/BlackWhiteList";
import { Separator } from "@/components/ui/separator";
import { mapLicense } from "@/lib/utils";
import Image from "next/image";

type Params = {
  id: string;
};

export const getArtifactById = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/artifacts/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return res.json();
};

export default async function Artifact({ params }: { params: Params }) {
  const { id } = params;

  const artifact = await getArtifactById(id);

  const { creatorId, imageUrl, license, whitelist, blacklist }: Artifact =
    artifact.data;

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
          <BlackWhiteList
            blacklist={blacklist}
            whitelist={whitelist}
            module="artifacts"
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

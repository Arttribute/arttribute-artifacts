import BlackWhiteList from "@/components/artifacts/BlackWhiteList";
import ImageGrid from "@/components/ImageGrid";
import { Separator } from "@/components/ui/separator";
import { artifacts } from "@/lib/dummy";
import { mapLicense } from "@/lib/utils";

type Params = {
  id: string;
};

export const getCollectionById = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/collections/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// TODO: fetch collection items to get images

export default async function Collection({ params }: { params: Params }) {
  const { id } = params;

  const { creator, license, whitelist, blacklist }: Collection =
    await getCollectionById(id);

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="mx-auto md:m-0 flex justify-center items-center gap-2">
          {/* p-0.5 border-2 rounded-lg */}
          <Separator orientation="vertical" className="h-full w-[1px]" />
          <ImageGrid images={Array(5).fill(artifacts[0].image_url)} />{" "}
          {/* TODO: replace this */}
          <Separator orientation="vertical" className="h-full w-[1px]" />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold">
            Arttribute {mapLicense(license)} License
          </h4>
          <p className="font-extralight text-sm">X Attributions</p>{" "}
          {/* TODO: maybe got by join? */}
          <BlackWhiteList
            blacklist={blacklist}
            whitelist={whitelist}
            module="collections"
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

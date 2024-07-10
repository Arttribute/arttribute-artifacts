import BlackWhiteList from "@/components/artifacts/BlackWhiteList";
import ImageGrid from "@/components/ImageGrid";
import { Separator } from "@/components/ui/separator";
import { getCollectionById, getCollectionItems } from "@/lib/fetchers-server";
import { mapLicense } from "@/lib/utils";

type Params = {
  id: string;
};

export default async function Collection({ params }: { params: Params }) {
  const { id } = params;

  const collectionPromise: Promise<Collection> = getCollectionById(id);
  const collectionItemsPromise: Promise<string[]> = getCollectionItems(id);

  const [collection, artifactImages] = await Promise.all([
    collectionPromise,
    collectionItemsPromise,
  ]);

  const { license, whitelist, blacklist }: Collection = collection;

  return (
    <div className="container p-6 space-y-2 w-full lg:pt-12 lg:pl-20">
      <div className="flex gap-6 flex-col text-center md:flex-row md:text-left">
        <div className="mx-auto md:m-0 flex justify-center items-center gap-2">
          <Separator orientation="vertical" className="h-full w-[1px]" />
          <ImageGrid images={artifactImages} />
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

import { buttonVariants } from "@/components/ui/button";
import { artifacts } from "@/lib/dummy";
import Image from "next/image";
import Link from "next/link";

export default async function Artifacts() {
  return (
    <div className="container p-6 space-y-2 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Artifacts</h1>
        <Link href="/artifacts/create" className={buttonVariants()}>
          Add New Artifact
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 w-full">
        {artifacts.map((item) => (
          <div
            key={item.id}
            className="w-[32%] md:w-[24%] lg:w-[19%] xl:w-[16%] p-4 rounded-lg border-2 aspect-square flex justify-center items-center"
          >
            <Image
              src={item.image_url}
              alt="Vercel Logo"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

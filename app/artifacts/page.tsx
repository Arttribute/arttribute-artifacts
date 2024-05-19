import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const getArtifacts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/artifacts`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return res.json();
};

export default async function Artifacts() {
  const artifacts: Artifact[] = await getArtifacts();

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
          <Link
            href={`/artifacts/${item.id}`}
            key={item.id}
            className="w-[32%] md:w-[24%] lg:w-[19%] xl:w-[16%] p-1 rounded-lg border-2 flex justify-center items-center hover:border-primary/50 transition-all duration-200 ease-in-out"
          >
            <Image
              src={item.imageUrl}
              alt="Vercel Logo"
              width={400}
              height={400}
              className="object-cover rounded-lg aspect-square"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

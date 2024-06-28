import Tester from "@/components/Tester";
import { getArtifacts } from "@/lib/fetchers-server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  try {
    const artifacts: Artifact[] = await getArtifacts();
    return (
      <div className="container p-6 flex flex-wrap gap-2 w-full">
        <Tester />
        {artifacts && artifacts.length > 0 ? (
          artifacts.map((item) => (
            <Link
              href={`/artifacts/${item.id}`}
              key={item.id}
              className="w-[31%] md:w-[24%] lg:w-[19%] xl:w-[16%] p-1 rounded-lg border-2 flex justify-center items-center hover:border-primary/50 transition-all duration-200 ease-in-out"
            >
              <Image
                src={item.imageUrl}
                alt={item.name ?? "Artifact"}
                width={400}
                height={400}
                className="object-cover rounded-lg aspect-square"
              />
            </Link>
          ))
        ) : (
          <>There is nothing here!</>
        )}
      </div>
    );
  } catch (error: any) {
    console.error(error);
    return (
      <>
        <p>There was an error!</p>
        <p>{error.toString()}</p>
      </>
    );
  }
}

"use client";
import NotFound from "@/components/NotFound";
import { useAuth } from "@/components/providers/AuthProvider";
import { buttonVariants } from "@/components/ui/button";
import { useArtifacts } from "@/lib/fetchers";
import Image from "next/image";
import Link from "next/link";

export default function Artifacts() {
  const { account } = useAuth();

  const { artifacts, isLoading, error } = useArtifacts(account);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) {
    let message = error.message;
    if (!account) message += ". Possible fix: Please login to view this page";
    throw new Error(message);
  }

  return (
    <div className="container p-6 space-y-2 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Artifacts</h1>
        <Link href="/artifacts/create" className={buttonVariants()}>
          Add New Artifact
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 w-full">
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
          <NotFound resource="artifact" />
        )}
      </div>
    </div>
  );
}

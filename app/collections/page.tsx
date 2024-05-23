import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const getCollections = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/collections`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function Collections() {
  const collections: Collection[] = await getCollections();

  return (
    <div className="container p-6 space-y-2 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Collections</h1>
        <Link href="/collections/create" className={buttonVariants()}>
          Create New Collection
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Collection Name</TableHead>
            <TableHead>Artifacts</TableHead>
            {/* TODO: Count of artifacts in collection */}
            <TableHead>Attributions</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.map((collection) => (
            <TableRow key={collection.id}>
              <TableCell>{collection.name ?? "Untitled"}</TableCell>
              <TableCell>{10}</TableCell>
              <TableCell>{100}</TableCell>
              <TableCell className="text-right">
                {formatDate(collection.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

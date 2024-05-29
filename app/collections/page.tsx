"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCollections } from "@/lib/fetchers";

export default function Collections() {
  const { account } = useAuth();

  const { collections, isLoading, error } = useCollections(account);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

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
              <TableCell className="text-right">
                <Link
                  href={`/collections/${collection.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                    className: "h-6 w-6",
                  })}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

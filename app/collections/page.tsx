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
import NotFound from "@/components/NotFound";
import { useMinipay } from "@/components/providers/MinipayProvider";

export default function Collections() {
  const { minipay } = useMinipay();
  const { account } = useAuth();

  const web3Address = minipay ? minipay.address : account;

  const { collections, isLoading, error } = useCollections(web3Address);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) {
    let message = error.message;
    if (!account) message += ". Possible fix: Please login to view this page";
    throw new Error(message);
  }

  return (
    <div className="container p-6 space-y-2 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Collections</h1>
        <Link href="/collections/create" className={buttonVariants()}>
          Create New Collection
        </Link>
      </div>

      {collections && collections.length > 0 ? (
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
      ) : (
        <div className="flex">
          <NotFound resource="collection" />
        </div>
      )}
    </div>
  );
}

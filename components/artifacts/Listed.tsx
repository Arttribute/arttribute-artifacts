"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "../ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import { handleChangeBlackWhiteList } from "@/app/actions/actions";

interface DataTableProps<TData, TValue> {
  id: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  directive: "black" | "white";
}

export const columns: ColumnDef<ListedUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Web3Address",
  },
  {
    accessorKey: "date_added",
    header: "Date Added",
    cell: ({ row }) => {
      const date: Date = row.getValue("date_added");
      const formatted = formatDate(date);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

function Listed<TData, TValue>({
  id,
  columns,
  data,
  directive,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const handleClick = async (action: "add" | "remove") => {
    const data = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original);

    const info = await handleChangeBlackWhiteList(
      id,
      directive,
      data as ListedUser[],
      action
    );
    console.log(info);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Input
          placeholder="Search for an address..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <ScrollArea className="h-[250px] w-full rounded-md border p-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => handleClick("remove")}>
          Remove
        </Button>
        <Button onClick={() => handleClick("add")}>Add to List</Button>
      </div>
    </div>
  );
}

export default Listed;

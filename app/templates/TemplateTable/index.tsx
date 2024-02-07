"use client";

import * as React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  ColumnDef,
  SortDirection,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MOCK_TEMPLATES, Template } from "@/app/Constants/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/Components/ui/table";

import { Button } from "@/app/Components/ui/button";
import { Checkbox } from "@/app/Components/ui/checkbox";
import { DeleteFilled } from "@/app/Components/Icons";
import { P } from "../../Components/Typography";
import dayjs from "dayjs";
import { useTemplatesStore } from "@/app/store";

export default function TemplateTable() {
  const { templates, deleteTemplate } = useTemplatesStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const columns: ColumnDef<Template>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="link"
          className="px-0 text-slate-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => (
        <P className="text-slate-500 font-medium w-fit">
          {row.getValue("name")}
        </P>
      ),
    },
    {
      accessorKey: "modified",
      header: ({ column }) => (
        <Button
          variant="link"
          className="px-0 text-slate-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modified
          <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => {
        const date: Date = row.getValue("modified");
        if (!date) {
          return "-";
        }
        const formatted = dayjs(date).format("MM/DD/YYYY HH:MM");
        return <P className="text-slate-500 whitespace-nowrap">{formatted}</P>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="w-14"></div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 w-full justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                deleteTemplate(row.index);
              }}
            >
              <DeleteFilled className="text-lg text-slate-500 dark:text-slate-400" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: templates,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div className="rounded-md border max-h-96 overflow-y-auto scrollable">
      <Table>
        <TableHeader className="sticky top-0 bg-background border-slate-600">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function SortIcon({ sorted }: { sorted: false | SortDirection }) {
  if (sorted === "asc") {
    return <ChevronDown className="ml-2 h-4 w-4" />;
  }
  return <ChevronUp className="ml-2 h-4 w-4" />;
}

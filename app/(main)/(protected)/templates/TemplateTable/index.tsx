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
import { H2, P } from "@/app/Components/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/Components/ui/table";
import { Template, useTemplateListStore } from "@/app/store";

import { Button } from "@/app/Components/ui/button";
import { Checkbox } from "@/app/Components/ui/checkbox";
import { DeleteFilled } from "@/app/Components/Icons";
import PopConfirm from "@/app/Components/PopConfirm";
import dayjs from "dayjs";
import { useToast } from "@/app/Components/ui/use-toast";

export default function TemplateTable() {
  const { templates, deleteTemplate, fetchLatestTemplates } =
    useTemplateListStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const { toast } = useToast();

  React.useEffect(() => {
    fetchLatestTemplates();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplate(id);
      toast({ title: "Successfully Deleted" });
    } catch (error) {
      console.error("Error deleting Template", error);
      toast({
        title: "Error deleting Template, please try again",
        variant: "destructive",
      });
    }
  };

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
          className="px-0 text-slate-600"
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
          className="px-0 text-slate-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modified
          <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => {
        const date: Date = row.original.modified;

        if (!date) {
          return "-";
        }
        const formatted = dayjs(date).format("MM/DD/YYYY HH:mm");
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
            <PopConfirm
              onConfirm={() => handleDelete(row.original?.id)}
              buttonProps={{
                variant: "ghost",
              }}
            >
              <DeleteFilled className="text-lg text-slate-700 dark:text-slate-400" />
            </PopConfirm>
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
    <div className="space-y-4">
      <H2 className="my-4">Consult Templates</H2>
      <div className="h-96 overflow-y-auto scrollable">
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
                  className="border-b-0"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 px-4">
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
      </div>
    </div>
  );
}

function SortIcon({ sorted }: { sorted: false | SortDirection }) {
  if (sorted === "asc") {
    return <ChevronDown className="ml-2 h-4 w-4" />;
  }
  return <ChevronUp className="ml-2 h-4 w-4" />;
}

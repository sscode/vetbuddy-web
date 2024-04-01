"use client";

import * as React from "react";

import { ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/Components/ui/dropdown-menu";
import { P, Span } from "@/app/Components/Typography";
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
import { cn } from "@/app/Lib/utils";
import dayjs from "dayjs";
import { deleteTemplate } from "@/app/Actions/templates";
import { useToast } from "@/app/Components/ui/use-toast";

type TProps = {
  templates: Template[];
};

export default function TemplateTable({ templates }: TProps) {
  const { fetchLatestTemplates } = useTemplateListStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchLatestTemplates();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      await deleteTemplate(formData);
      toast({ title: "Successfully Deleted" });
      setShowDeleteAlert(false);
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
          className="px-0 text-neutral-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Template Name
          <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => (
        <P className="text-neutral-800 font-medium w-fit">
          {row.getValue("name")}
        </P>
      ),
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <Button
          variant="link"
          className="px-0 text-neutral-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date & Time
          <SortIcon sorted={column.getIsSorted()} />
        </Button>
      ),
      cell: ({ row }) => {
        const date: Date = row.original.updated_at;

        if (!date) {
          return "-";
        }
        const formatted = dayjs(date).format("ddd, MMM D, YYYY h:mm A");
        return (
          <P className="text-neutral-800 whitespace-nowrap">{formatted}</P>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <Span className="text-neutral-600">Actions</Span>,
      cell: ({ row }) => {
        return (
          <>
            <div className="flex gap-2 w-full justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-fit px-0 text-neutral-400"
                  >
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive space-x-2"
                    onSelect={() => setShowDeleteAlert(true)}
                  >
                    <DeleteFilled className="text-lg" />
                    <Span>Delete</Span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <PopConfirm
              open={showDeleteAlert}
              onOpenChange={(open: boolean) => setShowDeleteAlert(open)}
              onConfirm={() => handleDelete(row.original?.id)}
            />
          </>
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
    <div className="w-full overflow-x-scroll sm:overflow-x-visible">
      <Table className="bg-white border border-neutral-100">
        <TableHeader className="sticky top-0 border-b border-neutral-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-neutral-100 bg-neutral-100 hover:bg-neutral-100"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    {...{
                      ...(header.id === "actions" && {
                        className: "w-0",
                      }),
                    }}
                  >
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
                className="border-neutral-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2 px-4">
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
  return <ChevronUp className={cn(!sorted && "opacity-0", "ml-2 h-4 w-4")} />;
}

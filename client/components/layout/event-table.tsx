"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  Forward,
  Trash2,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: EventType[] = [
  {
    eventID: "m5gr84i9",
    event: "Twitch",
    app: "Twitch",
    invites: ["https://twitch.tv/invite/xxxxxxxxxx"],
    createdAt: "2022-01-01",
  },
  {
    eventID: "3u1reuv4",
    event: "YouTube",
    app: "YouTube",
    invites: ["https://www.youtube.com/watch?v=xxxxxxxxxx"],
    createdAt: "2022-01-01",
  },
  {
    eventID: "derv1ws0",
    event: "Teams",
    app: "Teams",
    invites: ["https://teams.microsoft.com/l/meetup-join/xxxxxxxxxx"],
    createdAt: "2022-01-01",
  },
  {
    eventID: "5kma53ae",
    event: "Twitch",
    app: "Twitch",
    invites: ["https://twitch.tv/invite/xxxxxxxxxx"],
    createdAt: "2022-01-01",
  },
  {
    eventID: "5kma53ae",
    event: "Twitch",
    app: "Twitch",
    invites: ["https://twitch.tv/invite/xxxxxxxxxx"],
    createdAt: "2022-01-01",
  },
  {
    eventID: "5kma53ae",
    event: "Twitch",
    app: "Twitch",
    invites: ["https://twitch.tv/invite/xxxxxxxxxx"],
    createdAt: "2022-01-01",
  },
];

export type EventType = {
  eventID: string;
  event: string;
  app: string;
  invites: string[];
  createdAt: string;
};

// "eventID", "event", "app", "message", "invites", "createdAt"

export const columns: ColumnDef<EventType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="border-zinc-700 bg-transparent data-[state=checked]:border-transparent data-[state=checked]:bg-indigo-500"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className="border-zinc-800 group-data-[state=selected]:border-transparent group-data-[state=selected]:bg-indigo-500"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "eventID",
    header: "id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("eventID")}</div>
    ),
  },
  {
    accessorKey: "event",
    header: "event",
    cell: ({ row }) => <div className="lowercase">{row.getValue("event")}</div>,
  },
  {
    accessorKey: "app",
    header: "app",
    cell: ({ row }) => <div className="lowercase">{row.getValue("app")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("createdAt")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 border border-zinc-800 p-0 hover:bg-zinc-950"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-zinc-900 bg-zinc-950"
          >
            <DropdownMenuLabel className="text-white">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="flex items-center gap-1 text-white focus:bg-zinc-900 focus:text-slate-50"
              onClick={() => navigator.clipboard.writeText(task.eventID)}
            >
              <Copy className="h-4 w-4" /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="flex items-center gap-1 text-white focus:bg-zinc-900 focus:text-slate-50">
              <Forward className="h-4 w-4" /> Share Invite
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 text-[#ee7777] focus:bg-red-700 focus:text-red-200">
              <Trash2 className="h-4 w-4" /> Delete Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function EventTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter event..."
          value={(table.getColumn("event")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("event")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-zinc-900 bg-primary-hover-primary text-slate-50 placeholder:text-white focus:ring-offset-indigo-500"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto border-zinc-900 bg-zinc-950 text-white hover:bg-zinc-900 hover:text-white"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-zinc-900 bg-zinc-950"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-white focus:bg-zinc-900 focus:text-slate-50"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-zinc-900 bg-secondary-secondaryBG">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-zinc-900 hover:bg-zinc-950"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  className="group border-zinc-900 hover:bg-zinc-950 data-[state=selected]:bg-zinc-950 data-[state=selected]:shadow-md"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-slate-50 group-data-[state=selected]:text-indigo-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
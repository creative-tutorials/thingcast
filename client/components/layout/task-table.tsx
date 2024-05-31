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

const data: TaskType[] = [
  {
    id: "m5gr84i9",
    service: "Twitch",
    taskName: "Create a new stream",
    status: "in-progress",
    date: "2022-01-01",
    time: "10:00",
  },
  {
    id: "3u1reuv4",
    service: "YouTube",
    taskName: "Create a new video",
    status: "not-started",
    date: "2022-01-01",
    time: "10:00",
  },
  {
    id: "derv1ws0",
    service: "Teams",
    taskName: "Create a new meeting",
    status: "in-progress",
    date: "2022-01-01",
    time: "10:00",
  },
  {
    id: "5kma53ae",
    service: "Twitch",
    taskName: "Create a second new stream",
    status: "done",
    date: "2022-01-01",
    time: "10:00",
  },
];

export type TaskType = {
  id: string;
  service: string;
  taskName: string;
  status: "not-started" | "in-progress" | "done";
  date: string;
  time: string;
};

export const columns: ColumnDef<TaskType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="data-[state=checked]:bg-indigo-500 bg-transparent border-zinc-700 data-[state=checked]:border-transparent"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        className="border-zinc-800 group-data-[state=selected]:bg-indigo-500 group-data-[state=selected]:border-transparent"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("service")}</div>
    ),
  },
  {
    accessorKey: "taskName",
    header: "Task",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("taskName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className="lowercase data-[status=not-started]:bg-amber-800 data-[status=not-started]:text-amber-300 data-[status=in-progress]:bg-blue-800 data-[status=in-progress]:text-blue-300 data-[status=done]:bg-green-800 data-[status=done]:text-green-300 rounded-full p-1 text-center w-24"
        data-status={row.getValue("status")}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <div className="lowercase">{row.getValue("time")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
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
              className="h-8 w-8 p-0 hover:bg-zinc-950 border border-zinc-800"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-950 border-zinc-900"
          >
            <DropdownMenuLabel className="text-white">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="text-white focus:bg-zinc-900 focus:text-slate-50 flex items-center gap-1"
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              <Copy className="h-4 w-4" /> Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="text-white focus:bg-zinc-900 focus:text-slate-50 flex items-center gap-1">
              <Forward className="h-4 w-4" /> Share Invite
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#ee7777] focus:bg-red-700 focus:text-red-200 flex items-center gap-1">
              <Trash2 className="h-4 w-4" /> Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TaskTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    date: false,
    time: false,
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
          placeholder="Filter service..."
          value={(table.getColumn("service")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("service")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-primary-hover-primary placeholder:text-white focus:ring-offset-indigo-500 border-zinc-900 text-slate-50"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-zinc-950 border-zinc-900 hover:bg-zinc-900 text-white hover:text-white"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-950 border-zinc-900"
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
      <div className="rounded-md border bg-secondary-secondaryBG border-zinc-900">
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
                  className="group hover:bg-zinc-950 border-zinc-900 data-[state=selected]:bg-zinc-950 data-[state=selected]:shadow-md"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-slate-50 group-data-[state=selected]:text-indigo-500"
                    >
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

import { Dispatch, SetStateAction, useState } from "react";
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
  Edit2,
  Code,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { EventType, TableStoreType } from "@/types/event";
import { deleteMutation } from "@/types/mutations";

export function EventTable(props: {
  events: EventType[];
  mutation: deleteMutation;
  setTableStore: Dispatch<SetStateAction<TableStoreType>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const data: EventType[] = props.events;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const [formData, setFormData] = useState<EventType>({
    id: "",
    evntid: "",
    title: "",
    description: "",
    url: "",
    scheduled: "",
    slug: "",
  });

  const columns: ColumnDef<EventType>[] = [
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
      accessorKey: "evntid",
      header: "id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("evntid")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "title",
      cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "app",
      header: "app",
      cell: ({ row }) => <div className="">{row.getValue("app")}</div>,
    },
    {
      accessorKey: "scheduled",
      header: "scheduled",
      cell: ({ row }) => <div className="">{row.getValue("scheduled")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const event = row.original;

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
              className="border-zinc-900 bg-secondary-secondaryBG"
            >
              {/* <DropdownMenuLabel className="text-white">
                Actions
              </DropdownMenuLabel> */}
              <DropdownMenuItem
                className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-50"
                onClick={() => navigator.clipboard.writeText(event.evntid)}
              >
                <Copy className="h-4 w-4" /> Copy link
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-50"
                onClick={() => {
                  props.setTableStore({ id: event.id, evntid: event.evntid });
                  props.setOpen(true);
                }}
              >
                <Edit2 className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-50">
                <Code className="h-4 w-4" /> Embed
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem
                className="flex items-center gap-1 text-[#ee7777] focus:bg-red-700 focus:text-red-200"
                onClick={() =>
                  props.mutation.mutate({ id: event.id, evntid: event.evntid })
                }
              >
                <Trash className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-zinc-900 bg-primary-hover-primary text-slate-50 placeholder:text-white focus:ring-offset-indigo-500"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto border border-zinc-900 bg-secondary-secondaryBG text-white hover:border-zinc-700/50 hover:bg-secondary-hoversecondary hover:text-white"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-zinc-900 bg-secondary-secondaryBG"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-50"
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

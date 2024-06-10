"use client";

import { useAuth } from "@clerk/nextjs";
import { EventTable } from "./event-table";
import { getApiUrl } from "@/utils/apiutils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DialogComponent } from "@/components/layout/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import {
  DeleteEventParams,
  deleteMutation,
  UpdateEventParams,
  updateMutatuion,
} from "@/types/mutations";
import { TableStoreType } from "@/types/event";

export function ClientWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableStore, setTableStore] = useState<TableStoreType>({
    id: "",
    evntid: "",
  });
  const { isSignedIn, isLoaded, userId } = useAuth();
  const queryClient = useQueryClient();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  const getEvents = async () => {
    if (!isSignedIn && !isLoaded) return;

    try {
      const response = await axios.get("http://localhost:8080/event", {
        headers: {
          "Content-Type": "application/json",
          userid: userId,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const deleteEvent = async ({
    id,
    evntid,
  }: DeleteEventParams): Promise<any> => {
    if (!isSignedIn || !isLoaded) return;

    const url = getApiUrl("event");
    try {
      const response = await axios.delete(`${url}/${id}/${evntid}`, {
        headers: {
          "Content-Type": "application/json",
          userid: userId,
        },
      });

      if (response.status === 200) return response.data;

      // handle error
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const mutation: deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err: any) => {
      console.error("err", err);
      toast.error(err.message, {
        action: {
          label: "Close",
          onClick: () => console.log("Toast closed"),
        },
      });
    },
  });

  const updateEvent = async ({
    id,
    evntid,
    title,
    description,
    url,
    scheduled,
  }: UpdateEventParams) => {
    if (!isSignedIn || !isLoaded) return;

    const apiUrl = getApiUrl("event");
    try {
      const response = await axios.put(
        `${apiUrl}/${id}/${evntid}`,
        {
          title,
          description,
          url,
          scheduled,
        },
        {
          headers: {
            "Content-Type": "application/json",
            userid: userId,
          },
        },
      );

      if (response.status === 200) return response.data;

      // handle error
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const editMutation: updateMutatuion = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully", {
        action: {
          label: "Close",
          onClick: () => console.log("Toast closed"),
        },
      });
    },
    onError: (err: any) => {
      console.error("err", err);
      toast.error(err.message, {
        action: {
          label: "Close",
          onClick: () => console.log("Toast closed"),
        },
      });
    },
  });

  if (isPending) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div id="client-wrapper">
      {/* ------- ERROR LOGGER ------- */}
      {isError && (
        <div className="mt-5 w-fit rounded-lg border border-red-900 bg-red-950 p-2 text-red-300">
          Error: {error.message}
        </div>
      )}
      {/* ------- EVENT TABLE ------- */}
      {data && (
        <EventTable
          events={data}
          mutation={mutation}
          setTableStore={setTableStore}
          setOpen={setIsOpen}
        />
      )}

      {/* ------- EDIT EVENT DIALOG ------- */}
      <DialogComponent
        setOpen={setIsOpen}
        isOpen={isOpen}
        editMutation={editMutation}
        tableStore={tableStore}
      />
    </div>
  );
}

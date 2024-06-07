"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { EventTable } from "./event-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function ClientWrapper() {
  const { isSignedIn, isLoaded, userId } = useAuth();
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (isError) {
    console.error("error caught");
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div id="client-wrapper">
      {/* ------- EVENT TABLE ------- */}
      {isError && <div>Error: {error.message}</div>}
      {!isError && <EventTable events={data} />}
    </div>
  );
}

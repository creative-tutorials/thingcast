import { apps } from "@/utils/apputils";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { getApiUrl, getAppUrl } from "@/utils/url-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteEventParams,
  deleteMutation,
  UpdateEventParams,
  updateMutatuion,
} from "@/types/mutations";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { dialogControlType } from "@/types/control";
import { Dispatch, SetStateAction } from "react";
import { TableStoreType } from "@/types/event";
import { LoadingSkeleton } from "./ui/skeleton";

export type eventProp = {
  id: string;
  evntid: string;
  title: string;
  description: string;
  app: string;
  slug: string;
  url: string;
  date: string;
  time: string;
};

export type CardProp = {
  setUri: Dispatch<SetStateAction<string>>;
  setFormD: Dispatch<SetStateAction<TableStoreType>>;
  dialogs: dialogControlType;
  setDialogs: Dispatch<SetStateAction<dialogControlType>>;
};

export function EventCard(props: CardProp) {
  const { setUri, setFormD, dialogs, setDialogs } = props;

  const apiUrl = getApiUrl("event");
  const url = getAppUrl("invite");

  const { isSignedIn, isLoaded, userId, getToken } = useAuth();
  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });
  const queryClient = useQueryClient();

  const getEvents = async () => {
    if (!isSignedIn && !isLoaded) return;

    try {
      const token = await getToken();
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userid: userId,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
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

    try {
      const token = await getToken();
      const response = await axios.delete(`${apiUrl}/${id}/${evntid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  //

  const eventData: eventProp[] = isPending || isError ? [] : data;

  type Acc = { [key: string]: eventProp[] };

  const groupedEvents = eventData.reduce((acc: Acc, event: eventProp) => {
    // group events by date
    const date = event.date;
    if (!acc[date]) {
      // if date not found, create an empty array
      acc[date] = [];
    }
    acc[date].push(event); // add event to the array
    return acc; // return the updated object
  }, {}) as Acc;

  if (isPending) return <LoadingSkeleton />;

  return (
    <div id="event-card">
      {isError && (
        <div className="mt-5 w-fit rounded-lg border border-red-900 bg-red-950 p-2 text-red-300">
          Error: {error.message}
        </div>
      )}
      {data && (
        <div className="my-8 flex flex-col gap-4">
          {Object.keys(groupedEvents).map((date) => (
            <div key={date} className="mb-4">
              <div
                id="date"
                className="h-full rounded-md border border-zinc-900 bg-secondary-secondaryBG p-2"
              >
                <hgroup>
                  <h3 className="text-sm text-indigo-300">{date}</h3>
                </hgroup>
              </div>
              {groupedEvents[date].map((event: eventProp) => (
                <ContextMenu>
                  <ContextMenuTrigger className="">
                    <div
                      id="card"
                      className="h-full w-full cursor-pointer select-none rounded-md border border-zinc-900 bg-secondary-secondaryBG p-2 hover:border-indigo-500 hover:bg-zinc-950 hover:shadow-inner hover:shadow-indigo-500/30 hover:backdrop-blur-sm"
                    >
                      <div id="card-content">
                        <div id="card-title">
                          <p className="text-white">{event.title}</p>
                        </div>
                        <div
                          id="--card-bottom"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-neutral-300">
                            {event.time}
                          </span>
                          <div
                            id="app-icon"
                            className="flex items-center gap-2"
                          >
                            {apps.find((app) => app.id === event.app)?.icon}
                            <p className="text-sm text-neutral-300">
                              {apps.find((app) => app.id === event.app)?.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64 border-zinc-900 bg-secondary-secondaryBG">
                    <ContextMenuItem
                      inset
                      className="text-neutral-300 focus:bg-primary-hover-primary focus:text-white"
                      onClick={() => refetch()} // refetch the query
                    >
                      Refetch
                      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator className="border-b border-zinc-900" />
                    <ContextMenuItem
                      inset
                      className="text-neutral-300 focus:bg-primary-hover-primary focus:text-white"
                      onClick={() => {
                        setFormD({ id: event.id, evntid: event.evntid });
                        setDialogs({ ...dialogs, isOpen: true });
                      }}
                    >
                      Edit
                      <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                    </ContextMenuItem>

                    <ContextMenuItem
                      inset
                      className="text-neutral-300 focus:bg-primary-hover-primary focus:text-white"
                      onClick={() => {
                        setUri(`${url}/${event.slug}`);
                        setDialogs({ ...dialogs, isCopyOpen: true });
                      }}
                    >
                      Copy Invite
                      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem
                      inset
                      className="text-[#ee7777] focus:bg-red-700 focus:text-red-200"
                      disabled={mutation.isPending}
                      onClick={() =>
                        mutation.mutate({ id: event.id, evntid: event.evntid })
                      }
                    >
                      Delete
                      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

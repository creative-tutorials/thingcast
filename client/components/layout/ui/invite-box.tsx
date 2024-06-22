"use client";

import Image from "next/image";
import { apps } from "@/utils/apputils";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getApiUrl } from "@/utils/url-utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoadingSkeleton } from "./skeleton";

type Invite = {
  id: string;
  title: string;
  description: string;
  url: string;
  slug: string;
  app: string;
  host: string;
  date: string;
  time: string;
};

export function InviteBox({ slug }: { slug: string }) {
  const router = useRouter();
  const { isPending, isError, error, data } = useQuery<Invite>({
    queryKey: ["invite"],
    queryFn: () => getInvitation(),
  });

  const getInvitation = async () => {
    try {
      const url = getApiUrl("invite");
      const response = await axios.get(`${url}/${slug}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { data } = response;

        console.log(data);

        return response.data;
      }

      // handle error
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-20 w-fit rounded-lg border border-red-900 bg-red-950 p-2 text-sm text-red-300 md:mt-5 md:text-base lg:mt-5 lg:text-base">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div
      id="invite-box"
      className="my-20 flex flex-col items-start gap-8 md:my-8 md:flex-row lg:my-8 lg:flex-row"
    >
      <div id="left-col" className="flex flex-col gap-6">
        <div id="image-canvas">
          <Image
            src="/thingcast-invite.png"
            width={500}
            height={500}
            alt="You are invited to a thingcast event"
            className="rounded-xl shadow shadow-indigo-500/50"
          />
        </div>
        <div id="host" className="mt-auto">
          <h4 className="text-sm font-medium text-neutral-300">Hosted by</h4>
          <Separator className="my-4 border border-zinc-800" />
          <div id="event-host">
            <p
              id="event-host-name"
              className="text-base font-normal text-white md:text-lg md:font-medium lg:text-lg lg:font-medium"
            >
              {data.host ?? "Annoymous User"}
            </p>
          </div>
        </div>
      </div>
      <div id="right-col" className="flex w-full flex-col gap-4">
        <hgroup>
          <h1 className="text-2xl font-semibold text-white md:text-3xl lg:text-3xl">
            {data.title ?? "ThingCast Demo v1"}
          </h1>
        </hgroup>
        <div id="date-n-app" className="flex flex-col gap-2">
          <div id="date-time" className="flex items-center gap-2">
            <div
              id="calendar-icon"
              className="rounded-md border border-zinc-700 p-2"
            >
              <CalendarDays className="h-5 w-5 text-neutral-400" />
            </div>
            <hgroup id="date-time-context">
              <h3 className="text-sm font-medium text-white md:text-base lg:text-base">
                {data.date ?? "Monday, June 10"}
              </h3>
              <p className="text-sm font-medium text-neutral-300">
                {data.time ?? "2:00 PM"}
              </p>
            </hgroup>
          </div>
          <div id="-app" className="flex items-center gap-2">
            <div
              id="app-icon"
              className="rounded-md border border-zinc-700 p-2"
            >
              {apps.find((app) => app.id === data.app.toLowerCase())?.icon}
            </div>
            <div
              id="app-title"
              className="text-base font-medium text-white md:text-lg lg:text-lg"
            >
              {apps.find((app) => app.id === data.app.toLowerCase())?.text}
            </div>
          </div>
        </div>
        <div
          id="-register"
          className="relative flex w-auto flex-col gap-4 rounded-lg border border-zinc-900 bg-secondary-secondaryBG p-8 px-4 shadow-md"
        >
          <div
            id="float"
            className="absolute right-0 top-0 z-10 w-full rounded-t-md bg-zinc-900 p-2 px-4"
          >
            <p className="text-base font-medium text-neutral-300">
              Registration
            </p>
          </div>
          <hgroup className="mt-6">
            <p className="text-white">
              Welcome! Please register to attend this event.
            </p>
          </hgroup>
          <div id="btn-wrapper">
            <Button
              className="w-full rounded-lg bg-white text-lg text-black hover:bg-slate-100"
              onClick={() => router.replace(`${data.url}`)}
            >
              Register
            </Button>
          </div>
        </div>
        <div id="-info-event">
          <hgroup>
            <h4 className="text-sm font-medium text-neutral-300">
              About Event
            </h4>
            <Separator className="my-4 border border-zinc-800" />
            <p className="text-white">
              {data.description ?? "Thingcast demo v1"}
            </p>
          </hgroup>
        </div>
      </div>
    </div>
  );
}

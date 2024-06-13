"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { FormContent } from "@/components/layout/form-content";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormSchema } from "@/utils/form_utils";
import { useState } from "react";
import { getApiUrl } from "@/utils/url-utils";

export function TopBar() {
  const { isSignedIn, isLoaded, userId, getToken } = useAuth();
  const [formData, setFormData] = useState<FormSchema>({
    title: "",
    description: "",
    app: "",
    url: "",
  });
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("10:00");
  const queryClient = useQueryClient();

  const createEvent = async () => {
    if (!isSignedIn && !isLoaded) return;

    const apiUrl = getApiUrl("events");

    try {
      const token = await getToken();
      const response = await axios.post(
        `${apiUrl}`,
        {
          title: formData.title,
          description: formData.description,
          apk: formData.app,
          url: formData.url,
          scheduled: `${date?.toDateString()} / ${time}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message, {
        action: {
          label: "Close",
          onClick: () => console.log("Toast closed"),
        },
      });
    },
  });

  return (
    <div id="--top--bar" className="flex items-center justify-between gap-5">
      <hgroup>
        <h1 className="text-xl font-bold text-white">Events</h1>
        <p className="text-sm text-muted-foreground">
          Create events to share with your teams or viewers
        </p>
      </hgroup>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1 rounded-md bg-indigo-500 hover:bg-indigo-600">
            <CirclePlus className="h-4 w-4" />
            New Event
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg rounded-2xl border-zinc-900 bg-secondary-secondaryBG">
          <DialogHeader>
            <DialogTitle className="text-white">Add a new event</DialogTitle>
            <DialogDescription>
              Create a new event to share with your team or viewers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full max-h-[70vh] flex-col gap-5 overflow-y-auto py-4">
            <FormContent
              fData={formData}
              setFData={setFormData}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant={"outline"}
                className="border-slate-600 bg-transparent text-white hover:border-slate-400 hover:bg-transparent hover:text-white"
              >
                Close
              </Button>
            </DialogClose>

            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

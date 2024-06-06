"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { FormContent } from "@/components/layout/form-content";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
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

export function TopBar() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [formData, setFormData] = useState<FormSchema>({
    title: "",
    description: "",
    app: "",
    url: "",
  });
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("10:00");
  const queryClient = useQueryClient();

  // const { isPending, isError, error, data } = useQuery({
  //   queryKey: ["events"],
  //   queryFn: () => getEvents(),
  // });

  // const getEvents = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/event", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         userid: "test",
  //       },
  //     });

  //     if (response.status === 200) {
  //       return response.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  // if (isError) {
  //   console.error("error caught");
  // }

  const createEvent = async () => {
    if (!isSignedIn && !isLoaded) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/event",
        {
          title: formData.title,
          description: formData.description,
          app: formData.app,
          scheduled: `${date} ${time}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            userid: userId,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const mutation = useMutation({
    mutationFn: () => createEvent(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return (
    <div id="--top--bar" className="flex items-center gap-5">
      <hgroup>
        <h1 className="text-3xl font-bold text-white">Schedule</h1>
      </hgroup>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1 rounded-full bg-indigo-500 hover:bg-indigo-600">
            <CirclePlus className="h-4 w-4" />
            Create Schedule
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg rounded-2xl border-zinc-900 bg-secondary-secondaryBG">
          <DialogHeader>
            <DialogTitle className="text-white">Create Schedule</DialogTitle>
            <DialogDescription>
              Enter the details of your schedule and click save.
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
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

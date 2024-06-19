import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getApiUrl } from "@/utils/url-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { UpdateEventParams, updateMutatuion } from "@/types/mutations";
import { EventType, TableStoreType } from "@/types/event";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dialogControlType } from "@/types/control";

type DialogProps = {
  dialogs: dialogControlType;
  setDialogs: Dispatch<SetStateAction<dialogControlType>>;
  formD: TableStoreType;
};

export function DialogComponent(props: DialogProps) {
  const { dialogs, setDialogs, formD } = props;
  const { isSignedIn, isLoaded, userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<EventType>({
    id: "",
    evntid: "",
    title: "",
    description: "",
    url: "",
    scheduled: "",
    slug: "",
  });

  const updateEvent = async ({
    id,
    evntid,
    title,
    description,
    url,
  }: UpdateEventParams) => {
    if (!isSignedIn || !isLoaded) return;

    const apiUrl = getApiUrl("event");
    try {
      const token = await getToken();
      const response = await axios.put(
        `${apiUrl}/${id}/${evntid}`,
        {
          title,
          description,
          url,
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

  return (
    <Dialog open={dialogs.isOpen}>
      <DialogContent className="rounded-lg border-zinc-900 bg-zinc-950 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-muted-foreground">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Coffee Chat"
              autoComplete="off"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="col-span-3 border-zinc-900 bg-primary-primaryBG text-slate-50 focus:ring-offset-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="A quick coffee chat with the team"
              autoComplete="off"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="col-span-3 border-zinc-900 bg-primary-primaryBG text-slate-50 focus:ring-offset-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="url" className="text-muted-foreground">
              Url
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="twitch.tv/theo"
              autoComplete="off"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="col-span-3 border-zinc-900 bg-primary-primaryBG text-slate-50 focus:ring-offset-indigo-500"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            asChild
            onClick={() => setDialogs({ ...dialogs, isOpen: false })}
          >
            <Button
              variant={"outline"}
              className="border-slate-600 bg-transparent text-white hover:border-slate-400 hover:bg-transparent hover:text-white"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-primary-tagbackground hover:bg-primary-hover-primary"
            disabled={editMutation.isPending}
            onClick={() =>
              editMutation.mutate({
                id: formD.id,
                evntid: formD.evntid,
                title: formData.title,
                description: formData.description,
                url: formData.url,
              })
            }
          >
            {editMutation.isPending ? "Please wait..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

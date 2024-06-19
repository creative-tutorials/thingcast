import { Dispatch, SetStateAction, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dialogControlType, uriControlType } from "@/types/control";

type CopyDialogProps = {
  dialogs: dialogControlType;
  setDialogs: Dispatch<SetStateAction<dialogControlType>>;
  uri: uriControlType;
};

export function CopyDialog(props: CopyDialogProps) {
  const { dialogs, setDialogs, uri } = props;
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = async () => {
    const clipboard = navigator.clipboard;
    if (!clipboard) return;

    try {
      await clipboard.writeText(uri);
      setIsCopied(true);

      // handle timeout

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      // handle error
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  return (
    <Dialog open={dialogs.isCopyOpen}>
      <DialogContent className="rounded-lg border-zinc-900 bg-zinc-950 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={uri}
              value={uri}
              className="col-span-3 border-zinc-900 bg-primary-primaryBG text-slate-50 focus:ring-offset-indigo-500"
              readOnly
            />
          </div>
          <Button
            disabled={isCopied}
            type="submit"
            size="sm"
            className="px-3"
            onClick={copyLink}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose
            asChild
            onClick={() => setDialogs({ ...dialogs, isCopyOpen: false })}
          >
            <Button
              type="button"
              variant="outline"
              className="border-slate-600 bg-transparent text-white hover:border-slate-400 hover:bg-transparent hover:text-white"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

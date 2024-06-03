"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { TaskTable } from "./task-table";
import { FormContent } from "@/utils/form-content";
import { formIndex } from "@/utils/form_utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 1 ---- Title of the event
// 2 ---- Select Service (Apps)
// 3 ---- Select People to invite
// 4 ---- Select Time and Date
// 5 ---- Draft Personalized message to send to the people & Save

export function Content() {
  const [currentStep, setCurrentStep] = useState(0);
  const formContent = FormContent();

  const handleNext = () => {
    if (currentStep < formIndex.length - 1) {
      setCurrentStep((prev) => prev + 1); // setting the current step to the next value
    } else {
      console.log("submit");
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1); // setting the current step to the previous value
    }
  };

  return (
    <div id="content" className="w-full p-4">
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
            <div className="grid gap-4 py-4">{formContent[currentStep]}</div>
            <DialogFooter>
              {currentStep > 0 && (
                <Button
                  variant={"outline"}
                  className="border-slate-600 bg-transparent text-white hover:border-slate-400 hover:bg-transparent hover:text-white"
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              )}
              <Button
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={handleNext}
              >
                {currentStep < formIndex.length - 1 ? "Continue" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* ------- TABLE ------- */}
      <TaskTable />
    </div>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2, UsersRound } from "lucide-react";
import { CalendarDays as CalendarIcon } from "lucide-react";
import { TaskTable } from "./task-table";
import { addDays, format } from "date-fns";
import { timeSnippet } from "@/utils/timeSnippets";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { GoogleMeet } from "./icons/meet";
import { MicrosoftTeams } from "./icons/teams";
import { Slack } from "./icons/slack";
import { TwitchAlt } from "./icons/twitch";
import { Zoom } from "./icons/zoom";
import { YoutubeIcon } from "./icons/youtube";

const formIndex = [1, 2, 3, 4, 5, 6];

// 1 ---- Title of the event
// 2 ---- Select Service (Apps)
// 3 ---- Select People to invite
// 4 ---- Select Time and Date
// 5 ---- Draft Personalized message to send to the people
// 6 ---- Create Schedule

export type FormData = {
  task: string;
  app: string;
  timeDate: string;
};

export function Content() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("10:00");
  const [currentStep, setCurrentStep] = useState(0);
  const [inviteField, setInviteField] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(-1);
  const [inviteArray, setInviteArray] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    task: "",
    app: "",
    timeDate: "",
  });

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

  const parseInvites = (event: { target: { value: string } }) => {
    setInviteField(event.target.value);

    if (event.target.value.endsWith(",")) {
      const invites = event.target.value.split(",").filter(Boolean); // remove empty strings
      invites.forEach((invite) => {
        inviteArray.push(invite.trim()); // remove whitespace
      });

      // clear the input field
      setInviteField("");
    }
  };

  const AppsList = [
    <div
      id="app"
      className="flex flex-col items-center cursor-pointer"
      key={"meet"}
    >
      <div id="icon">
        <GoogleMeet width={44} height={44} />
      </div>
      <hgroup id="text-content">
        <p className="text-white">Meet</p>
      </hgroup>
    </div>,
    <div
      id="app"
      className="flex flex-col items-center cursor-pointer"
      key={"teams"}
    >
      <div id="icon">
        <MicrosoftTeams width={44} height={44} />
      </div>
      <hgroup id="text-content">
        <p className="text-white">Teams</p>
      </hgroup>
    </div>,
    <div
      id="app"
      className="flex flex-col items-center cursor-pointer"
      key={"slack"}
    >
      <div id="icon">
        <Slack width={44} height={44} />
      </div>
      <hgroup id="text-content">
        <p className="text-white">Slack</p>
      </hgroup>
    </div>,
    <div
      id="app"
      className="flex flex-col items-center cursor-pointer"
      key={"twitch"}
    >
      <div id="icon">
        <TwitchAlt width={44} height={44} />
      </div>
      <hgroup id="text-content">
        <p className="text-white">Twitch</p>
      </hgroup>
    </div>,
    <div
      id="app"
      className="flex flex-col items-center cursor-pointer"
      key={"zoom"}
    >
      <div id="icon">
        <Zoom width={44} height={44} />
      </div>
      <hgroup id="text-content">
        <p className="text-white">Zoom</p>
      </hgroup>
    </div>,
    <div
      id="app"
      className="flex flex-col items-center cursor-pointer"
      key={"youtube"}
    >
      <div id="icon">
        <YoutubeIcon width={44} height={44} />
      </div>
      <hgroup id="text-content">
        <p className="text-white">YouTube</p>
      </hgroup>
    </div>,
  ];

  const formContent = [
    // step 1 = title of the event
    <div className="" key={"step-1"}>
      <Label htmlFor="name" className="text-right text-white">
        Event Name
      </Label>
      <Input
        id="name"
        placeholder="Playing Fortnite"
        className="col-span-3 bg-zinc-950 border-zinc-800 focus:border-indigo-300 focus:ring-offset-indigo-500 text-white"
        autoComplete="off"
      />
    </div>,
    // step 2 = select the app to use
    <div className="flex flex-col gap-4" key={"step-2"}>
      <h2 className="text-white font-bold text-xl">Apps</h2>
      <div id="apps" className="grid grid-cols-3 gap-4">
        {AppsList}
      </div>
    </div>,
    // step 3 = selecting people to invite
    <div className="" key={"step-3"}>
      <div id="step-content" className="flex flex-col gap-4">
        <div id="fields" className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-white">
            Enter the email addresses of the people you want to invite to the
            event.
          </Label>
          <Input
            id="email-invite"
            placeholder="john@gmail.com"
            className="col-span-3 bg-zinc-950 border-zinc-800 focus:border-indigo-300 focus:ring-offset-indigo-500 text-white"
            value={inviteField}
            onChange={parseInvites}
            autoComplete="off"
          />
        </div>
        <div id="email-tags" className="grid grid-cols-3 gap-4 w-full h-full ">
          {inviteArray.map((invite, index) => (
            <div
              key={index}
              id="tag"
              className="group w-full overflow-hidden flex items-center gap-1 transition-all bg-[hsl(224,10%,21%)] border border-zinc-600 hover:bg-red-600 hover:border-transparent shadow-inner rounded-lg p-2 cursor-pointer"
              // if mouse enter change the text to "Delete email?"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                setInviteArray(inviteArray.filter((i) => i !== invite)); // remove the invite from the array and update the state
                setInviteField("");
                setHoveredIndex(null);
              }}
            >
              <div
                id="tag-icon"
                className="transition-all group-hover:hidden"
                data-icon="users"
              >
                <UsersRound className="w-4 h-4 text-white" />
              </div>
              <div
                id="tag-icon"
                className="transition-all hidden group-hover:block relative"
                data-icon="trash"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </div>
              <div id="tag-text">
                <p className="text-white transition-all text-sm group-hover:text-red-200">
                  {hoveredIndex === index ? "Delete email?" : invite}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    // step 4 = select time and date for the event
    <div className="" key={"step-4"}>
      <div id="fields" className="flex flex-col gap-4">
        <Label htmlFor="name" className="text-white">
          Select the time and date for the event
        </Label>
        {/*  */}
        <div id="field-date">
          <Label htmlFor="date-field" className="text-white">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="col-span-3 w-full flex items-center justify-start bg-zinc-950 border-zinc-800 hover:bg-transparent hover:text-white focus:border-indigo-300 focus:ring-offset-indigo-500 text-white"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-primary-primaryBG rounded-2xl border border-slate-400 p-4 flex flex-col gap-4">
              <div id="duration-selection">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger className="bg-primary-hover-primary text-white border border-slate-600 rounded-lg focus:ring-offset-indigo-500 focus:border-indigo-300">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="bg-primary-primaryBG border border-slate-400 rounded-lg text-white"
                  >
                    <SelectItem
                      value="0"
                      className="focus:bg-indigo-500 focus:text-white rounded-lg focus:shadow-md"
                    >
                      Today
                    </SelectItem>
                    <SelectItem
                      value="1"
                      className="focus:bg-indigo-500 focus:text-white rounded-lg focus:shadow-md"
                    >
                      Tomorrow
                    </SelectItem>
                    <SelectItem
                      value="3"
                      className="focus:bg-indigo-500 focus:text-white rounded-lg focus:shadow-md"
                    >
                      In 3 days
                    </SelectItem>
                    <SelectItem
                      value="7"
                      className="focus:bg-indigo-500 focus:text-white rounded-lg focus:shadow-md"
                    >
                      In a week
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                id="calendar-picker"
                className="border border-slate-500 rounded-lg"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="text-white"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div id="field-time" className="relative">
          <Label htmlFor="time-field" className="text-white">
            Time
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                placeholder="12:00 PM"
                className="col-span-3 bg-zinc-950 border-zinc-800 focus:border-indigo-300 focus:ring-offset-indigo-500 text-white appearance-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-primary-primaryBG rounded-2xl border border-slate-400 p-4 ">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white leading-none">
                    Time Picker
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Pick a time for the event
                  </p>
                </div>
                <div className="" id="time-picker">
                  <Select onValueChange={(value) => setTime(value)}>
                    <SelectTrigger className="bg-primary-hover-primary text-white border border-slate-600 rounded-lg focus:ring-offset-indigo-500 focus:border-indigo-300">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="bg-primary-primaryBG border border-slate-400 rounded-lg text-white"
                    >
                      <SelectGroup>
                        {timeSnippet.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className="focus:bg-indigo-500 focus:text-white rounded-lg focus:shadow-md"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>,
  ];

  return (
    <div id="content" className="w-full p-4">
      <div id="--top--bar" className="flex gap-5 items-center">
        <hgroup>
          <h1 className="text-3xl font-bold text-white">Schedule</h1>
        </hgroup>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 rounded-full">
              <CirclePlus className="w-4 h-4" />
              Create Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg bg-secondary-secondaryBG border-zinc-900 rounded-2xl">
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
                  className="bg-transparent hover:bg-transparent text-white border-slate-600 hover:border-slate-400 hover:text-white"
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

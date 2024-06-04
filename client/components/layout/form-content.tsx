"use client";
import { Fragment, useState } from "react";
import { FormData } from "@/utils/form_utils";
import { timeSnippet } from "@/utils/timeSnippets";
import { apps } from "../../utils/apputils";
import { addDays, format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, UsersRound } from "lucide-react";
import { CalendarDays as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";

export function FormContent() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("10:00");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(-1);
  const [inviteArray, setInviteArray] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    task: "",
    app: "",
    email: "",
    message: "",
  });

  const parseInvites = (event: { target: { value: string } }) => {
    const emailValue = event.target.value;
    const emailArray = emailValue.split(",");
    setFormData((prev) => ({ ...prev, email: emailValue }));

    if (emailValue.endsWith(",")) {
      const invites = emailArray.filter(Boolean); // remove empty strings
      invites.forEach((invite) => {
        inviteArray.push(invite.trim()); // remove whitespace
      });

      // clear the input field
      setFormData((prev) => ({ ...prev, email: "" }));
    }
  };

  const validateAndUpdate = (event: { target: { value: string } }) => {
    const timeValue = event.target.value;
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const inputElement = event.target as HTMLInputElement;
    setTime(timeValue);

    // slicing the time to only show the first 5 characters
    if (timeValue.length > 5) {
      setTime(timeValue.slice(0, 5));
    }

    if (timeValue.match(timeRegex)) {
      inputElement.removeAttribute("data-status");
    } else {
      inputElement.setAttribute("data-status", "invalid");
    }
  };
  const updateTimeInput = (value: string) => {
    setTime(value);
    const inputElement = document.getElementById("time") as HTMLInputElement;
    inputElement.removeAttribute("data-status");
  };
  //
  return (
    <>
      {/* // step 1 = title of the event */}
      <div className="" key={"step-1"}>
        <div id="fields" className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-white">
            Event Name
          </Label>
          <div id="name-input">
            <Input
              id="name"
              placeholder="Playing Fortnite"
              value={formData.task}
              onChange={(e) =>
                setFormData({ ...formData, task: e.target.value })
              }
              className="col-span-3 border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      {/* // step 2 = select the app to use */}
      <div className="flex flex-col gap-4" key={"step-2"}>
        <h2 className="text-xl font-bold text-white">Apps</h2>
        <div id="apps" className="grid grid-cols-3 gap-4">
          {apps.map((app, index) => (
            <Fragment key={index}>
              <div
                key={app.id}
                id="app"
                data-app={app.id === formData.app ? "selected" : ""}
                className="flex cursor-pointer flex-col items-center rounded-md bg-transparent transition-all hover:bg-slate-700/30 data-[app=selected]:bg-slate-700/30"
                onClick={() => setFormData({ ...formData, app: app.id })}
              >
                <div id="icon">{app.icon}</div>
                <hgroup id="text-content">
                  <p className="text-white">{app.text}</p>
                </hgroup>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      {/* // step 3 = selecting people to invite */}
      <div className="flex flex-col gap-4" key={"step-3"}>
        <div id="fields" className="flex flex-col gap-4">
          <Label htmlFor="email-invite" className="text-white">
            Invite People
          </Label>
          <div id="invite-input" className="flex flex-col gap-2">
            <Input
              id="email-invite"
              placeholder="john@gmail.com"
              value={formData.email}
              onChange={parseInvites}
              className="col-span-3 border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
              autoComplete="off"
            />
            <p className="text-sm text-muted-foreground">
              Enter the email addresses of the people you want to invite to the
              event.
            </p>
          </div>
        </div>
        <div
          id="email-tags"
          className="grid h-full w-full grid-cols-3 gap-4 data-[display=hide]:hidden"
          data-display={inviteArray.length > 0 ? "show" : "hide"}
        >
          {inviteArray.map((invite, index) => (
            <div
              key={index}
              id="tag"
              className="group flex w-full cursor-pointer items-center gap-1 overflow-hidden rounded-lg border border-zinc-600 bg-[hsl(224,10%,21%)] p-2 shadow-inner transition-all hover:border-transparent hover:bg-red-600"
              // if mouse enter change the text to "Delete email?"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                setInviteArray(inviteArray.filter((i) => i !== invite)); // remove the invite from the array and update the state
                setFormData((prev) => ({ ...prev, email: "" }));
                setHoveredIndex(null);
              }}
            >
              <div
                id="tag-icon"
                className="transition-all group-hover:hidden"
                data-icon="users"
              >
                <UsersRound className="h-4 w-4 text-white" />
              </div>
              <div
                id="tag-icon"
                className="relative hidden transition-all group-hover:block"
                data-icon="trash"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </div>
              <div id="tag-text">
                <p className="text-sm text-white transition-all group-hover:text-red-200">
                  {hoveredIndex === index ? "Delete email?" : invite}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* // step 4 = select time and date for the event */}
      <div className="" key={"step-4"}>
        <div id="fields" className="flex flex-col gap-4">
          <Label className="text-white">
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
                  className="col-span-3 flex w-full items-center justify-start border-zinc-800 bg-zinc-950 text-white hover:bg-transparent hover:text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col gap-4 rounded-2xl border border-slate-400 bg-primary-primaryBG p-4">
                <div id="duration-selection">
                  <Select
                    onValueChange={(value) =>
                      setDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger className="rounded-lg border border-slate-600 bg-primary-hover-primary text-white focus:border-indigo-300 focus:ring-offset-indigo-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="rounded-lg border border-slate-400 bg-primary-primaryBG text-white"
                    >
                      <SelectItem
                        value="0"
                        className="rounded-lg focus:bg-indigo-500 focus:text-white focus:shadow-md"
                      >
                        Today
                      </SelectItem>
                      <SelectItem
                        value="1"
                        className="rounded-lg focus:bg-indigo-500 focus:text-white focus:shadow-md"
                      >
                        Tomorrow
                      </SelectItem>
                      <SelectItem
                        value="3"
                        className="rounded-lg focus:bg-indigo-500 focus:text-white focus:shadow-md"
                      >
                        In 3 days
                      </SelectItem>
                      <SelectItem
                        value="7"
                        className="rounded-lg focus:bg-indigo-500 focus:text-white focus:shadow-md"
                      >
                        In a week
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div
                  id="calendar-picker"
                  className="rounded-lg border border-slate-500"
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
            <Label htmlFor="time" className="text-white">
              Time
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  type="text"
                  placeholder="12:00"
                  value={time}
                  onChange={validateAndUpdate}
                  data-status="valid"
                  id="time"
                  className="col-span-3 appearance-none border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500 data-[status=invalid]:border-red-600 data-[status=invalid]:bg-red-600/30 data-[status=invalid]:ring-offset-red-600 data-[status=invalid]:placeholder:text-red-300 data-[status=invalid]:focus:border-red-600"
                />
              </PopoverTrigger>
              <PopoverContent className="rounded-2xl border border-slate-600 bg-primary-primaryBG p-4">
                <div className="" id="time-picker">
                  <Select onValueChange={updateTimeInput}>
                    <SelectTrigger className="w-full rounded-lg border border-slate-700 bg-primary-hover-primary text-white focus:border-indigo-300 focus:ring-offset-indigo-500">
                      <SelectValue placeholder={time} />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="rounded-lg border border-slate-600 bg-primary-primaryBG text-white"
                    >
                      <SelectGroup>
                        {timeSnippet.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className="rounded-lg focus:bg-indigo-500 focus:text-white focus:shadow-md"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {/* // step 5 = draft message */}
      <div className="" key={"step-5"}>
        <div id="fields" className="flex flex-col gap-4">
          <Label htmlFor="message" className="text-white">
            Draft Message
          </Label>
          <div id="message-input" className="flex flex-col gap-2">
            <Textarea
              id="message"
              placeholder="Enter an exciting message for this event"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="col-span-3 border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
              autoComplete="off"
            />
            <p className="text-sm text-muted-foreground">
              Your message will be sent to the people you have selected.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

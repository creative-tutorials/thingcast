import { Dispatch, SetStateAction } from "react";
import { FormSchema } from "@/utils/form_utils";
import { timeSnippet } from "@/utils/timeSnippets";
import { apps } from "../../utils/apputils";
import { addDays, format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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

type FormContentProps = {
  fData: FormSchema;
  setFData: Dispatch<SetStateAction<FormSchema>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
};

export function FormContent(props: FormContentProps) {
  const { fData, setFData, date, setDate, time, setTime } = props;

  const updateTime = (event: { target: { value: string } }) => {
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

  const changeTimeOnSelect = (value: string) => {
    setTime(value);
    const inputElement = document.getElementById("time") as HTMLInputElement;
    inputElement.removeAttribute("data-status");
  };
  //
  return (
    <>
      <div id="og-title">
        <div id="fields" className="flex flex-col gap-2">
          <Label htmlFor="tltle" className="text-white">
            Title
          </Label>
          <div id="title-input">
            <Input
              id="title"
              name="title"
              placeholder="Streaming with Theo"
              value={fData.title}
              onChange={(e) => setFData({ ...fData, title: e.target.value })}
              className="col-span-3 border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div id="og-invite">
        <div id="fields" className="flex flex-col gap-4">
          <Label htmlFor="meeting-link" className="text-white">
            Invite People
          </Label>
          <div id="invite-input" className="flex flex-col gap-2">
            <Input
              id="meeting-link"
              name="meeting-link"
              placeholder="zoom.us/join/xxxxxxxxxx"
              type="text"
              value={fData.url}
              onChange={(e) => setFData({ ...fData, url: e.target.value })}
              className="col-span-3 border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
              autoComplete="off"
            />
            <p className="text-sm text-muted-foreground">
              Add a link to the meeting you want to invite people to.
            </p>
          </div>
        </div>
      </div>
      <div id="og-description">
        <div id="fields" className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-white">
            Draft Message
          </Label>
          <div id="description-input" className="flex flex-col gap-2">
            <Textarea
              id="description"
              name="description"
              placeholder="Tell your audience what you're going to do"
              value={fData.description}
              onChange={(e) =>
                setFData({ ...fData, description: e.target.value })
              }
              className="col-span-3 border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div id="og-app">
        <div id="app-field" className="flex flex-col gap-2">
          <Label className="text-white">Apps</Label>
          <div id="apps">
            <Select
              onValueChange={(value) => setFData({ ...fData, app: value })}
            >
              <SelectTrigger className="w-full rounded-lg border border-slate-700 bg-primary-hover-primary text-white focus:border-indigo-300 focus:ring-offset-indigo-500">
                <SelectValue placeholder="Select an app" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-slate-600 bg-primary-primaryBG text-white">
                <SelectGroup className="">
                  {apps.map((app, index) => (
                    <SelectItem
                      key={index}
                      className="focus:bg-indigo-700 focus:text-white focus:shadow-md"
                      value={app.text}
                    >
                      <div id="wrap" className="flex items-center gap-2">
                        <div id="icon">{app.icon}</div>
                        <div id="text">{app.text}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div id="date-time-field">
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
                  onChange={updateTime}
                  data-status="valid"
                  id="time"
                  className="col-span-3 appearance-none border-zinc-800 bg-zinc-950 text-white focus:border-indigo-300 focus:ring-offset-indigo-500 data-[status=invalid]:border-red-600 data-[status=invalid]:bg-red-600/30 data-[status=invalid]:ring-offset-red-600 data-[status=invalid]:placeholder:text-red-300 data-[status=invalid]:focus:border-red-600"
                />
              </PopoverTrigger>
              <PopoverContent className="rounded-2xl border border-slate-600 bg-primary-primaryBG p-4">
                <div className="" id="time-picker">
                  <Select onValueChange={changeTimeOnSelect}>
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
    </>
  );
}

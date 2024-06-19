import { format, startOfWeek, addDays } from "date-fns";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyCalendar() {
  const startOfWeekDate = startOfWeek(new Date());

  // Dummy events data
  const events = [
    {
      title: "Meeting with Team",
      day: 3,
      startTime: "10:00 PM",
      endTime: "10:30 AM",
    },
    {
      title: "Client Call",
      day: 0,
      startTime: "11:00 AM",
      endTime: "12:00 PM",
    },
    // Add more events as needed
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-8 gap-2">
        <div></div>
        {days.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day} <br />
            {format(addDays(startOfWeekDate, index), "d MMM")}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-8 gap-2">
        <div className="col-span-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="h-16 border-t border-gray-300 text-center"
            >
              {index + 8}:00 AM
            </div>
          ))}
        </div>
        <div className="col-span-7">
          {Array.from({ length: 12 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid h-16 grid-cols-7 gap-2 border-t border-gray-300"
            >
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <div key={colIndex} className="relative border border-gray-300">
                  {events
                    .filter(
                      (event) =>
                        event.day === colIndex &&
                        event.startTime === `${rowIndex + 8}:00 AM`,
                    )
                    .map((event, eventIndex) => (
                      <EventDump
                        key={eventIndex}
                        title={event.title}
                        startTime={event.startTime}
                        endTime={event.endTime}
                      />
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type TypeEvent = {
  title: string;
  startTime: string;
  endTime: string;
};

export function EventDump(props: TypeEvent) {
  const { title, startTime, endTime } = props;

  return (
    <div className="absolute h-full w-full rounded-lg bg-blue-500 p-2 text-white">
      <div className="text-sm font-bold">{title}</div>
      <div className="text-xs">
        {startTime} - {endTime}
      </div>
    </div>
  );
}

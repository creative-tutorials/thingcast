import { TopBar } from "./tob-bar";
import { EventTable } from "./event-table";

// 1 ---- Title of the event
// 2 ---- Select Service (Apps)
// 3 ---- Select People to invite
// 4 ---- Select Time and Date
// 5 ---- Draft Personalized message to send to the people & Save

export function Content() {
  return (
    <div id="content" className="w-full p-4">
      {/* ------- TOP BAR ------- */}
      <TopBar />
      {/* ------- TABLE ------- */}
      <EventTable />
    </div>
  );
}
